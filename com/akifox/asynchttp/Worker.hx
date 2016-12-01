package com.akifox.asynchttp;

#if cpp
import cpp.vm.Deque;
import cpp.vm.Thread;
#elseif neko
import neko.vm.Deque;
import neko.vm.Thread;
#elseif java
import java.vm.Deque;
import java.vm.Thread;
#end

class Worker {

    private static var MESSAGE_COMPLETE = "__COMPLETE__";
    private static var MESSAGE_ERROR = "__ERROR__";

    #if (cpp || neko || java)

    private static var _mainLoopTimer:haxe.Timer;
    private static var _updateQueue:Array<Void->Void> = [];

    private static function addUpdateFunction(func:Void->Void):Void
    {
        _updateQueue.push(func);
        if(_mainLoopTimer == null)
        {
            _mainLoopTimer = new haxe.Timer(0);
            _mainLoopTimer.run = loopUpdate;
        }
    }

    private static function removeUpdateFunction(func:Void->Void):Void
    {
        _updateQueue.remove(func);
        if(_updateQueue.length == 0 && _mainLoopTimer != null)
        {
            _mainLoopTimer.stop();
            _mainLoopTimer = null;
        }
    }

    private static function loopUpdate():Void
    {
        for(update in _updateQueue)
        {
            update();
        }
    }

    private function _update():Void
    {
        var message = _messageQueue.pop(false);
        if (message != null)
        {
            if (message == MESSAGE_ERROR)
            {
                removeUpdateFunction(_update);

                if (!canceled)
                {
                    canceled = true;
                    onError(_messageQueue.pop(false));
                }
            }
            else if (message == MESSAGE_COMPLETE)
            {
                removeUpdateFunction(_update);

                if (!canceled)
                {
                    canceled = true;
                    onComplete(_messageQueue.pop(false));
                }
            }
            else if (!canceled)
            {
                onProgress(message, _messageQueue.pop(false));
            }
        }
    }
    #end

    public var canceled (default, null):Bool;
    public var completed (default, null):Bool;
    public dynamic function doWork(message:Dynamic):Void {}
    public dynamic function onComplete(message:Dynamic):Void {}
    public dynamic function onError(message:Dynamic):Void {}
    public dynamic function onProgress(current:Int, total:Int):Void {}

    private var _runMessage:Dynamic;

    #if (cpp || neko || java)
    private var _messageQueue:Deque<Dynamic>;
    private var _workerThread:Thread;
    #end

    public function new()
    {

    }

    public function cancel():Void
    {
        canceled = true;

        #if (cpp || neko || java)

        _workerThread = null;

        #end
    }

    public function run(message:Dynamic = null):Void
    {
        canceled = false;
        completed = false;
        _runMessage = message;

        #if (cpp || neko || java)

        _messageQueue = new Deque<Dynamic>();
        _workerThread = Thread.create(_doWork);

        addUpdateFunction(_update);

        #else

        _doWork();

        #end
    }

    public function sendComplete(message:Dynamic = null):Void
    {
        completed = true;

        #if (cpp || neko || java)

        _messageQueue.add(MESSAGE_COMPLETE);
        _messageQueue.add(message);

        #else

        if (!canceled)
        {
            canceled = true;
            onComplete(message);
        }

        #end
    }

    public function sendError(message:Dynamic = null):Void
    {
        #if (cpp || neko || java)

        _messageQueue.add(MESSAGE_ERROR);
        _messageQueue.add(message);

        #else

        if (!canceled)
        {
            canceled = true;
            onError(message);
        }

        #end
    }

    public function sendProgress(current:Int, total:Int):Void
    {
        #if (cpp || neko || java)

        _messageQueue.add (current);
        _messageQueue.add (total);

        #else

        if (!canceled)
        {
            onProgress(current, total);
        }

        #end
    }

    private function _doWork():Void
    {
        doWork(_runMessage);
    }
}