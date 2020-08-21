/* global jsPlumb */
jsPlumb.ready(function() {

    //片段信息流程节点，均为id
    flowRender('clipName', 'clipStart');
    flowRender('clipStart', 'clipEnd');
    flowRender('clipEnd', 'clipSpeed');
    flowRender('clipSpeed', 'clipTrigger');

    //事件信息流程节点
    flowRender('eventFrameNo', 'eventType');
    flowRender('eventType', 'eventMethod');
    flowRender('eventMethod', 'eventTarget');
    flowRender('eventTarget', 'eventValueArray');
    flowRender('eventValueArray', 'eventTimeElapsed');
    flowRender('eventTimeElapsed', 'eventSlowMotion');
    flowRender('eventSlowMotion', 'eventLoop');
    flowRender('eventLoop', 'eventTimes');
})

//节点及连线类型样式
function flowRender(sourceNode, targetNode) {
    var common = {
        endpoint: ['Dot', {
            radius: 1
        }],
        connector: ['Straight'],
        anchor: ['Bottom', 'Top']
    }
    jsPlumb.connect({
        source: sourceNode,
        target: targetNode,
        paintStyle: {
            stroke: 'blue',
            strokeWidth: 2
        },
    }, common)
}