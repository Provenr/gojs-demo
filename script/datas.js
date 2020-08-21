// 树节点

treeNodeData = [{
    id: 1,
    label: '第一部分',
    Name: '第一部分', //片段名称
    //ClipFrame: ''     //起止帧，由起始帧和结束帧组成
    ClipFrameStart: '', //起始帧
    ClipFrameEnd: '', //结束帧
    Speed: 1.0, //速度

    TriggerObject: { //触发物体属性——单|与|或
        TriggerRadio: '', //主单选按钮

        SingleObject: '', //单物体

        AndObjects: {
            AndRadio: '', //与单选按钮

            NoSqcObjects: '', //无序

            SqcObject1: '', //有序1
            SqcObject2: '' //有序2
        },

        OrObjects: {
            OrRadio: '', //或单选按钮

            NoSqcObjects: '', //无序

            SqcObject1: '', //有序1
            SqcObject2: '' //有序2
        }
    },
    Object: '',
    children: [],
}];

//播放类型，未使用
playTypeData = [{
    code: 'linear',
    text: '直线'
}, {
    code: 'easeInSine',
    text: 'easeInSine'
}, {
    code: 'easeOutSine',
    text: 'easeOutSine'
}]

/**
 * 附加参数：
 *  obj: 0-禁用“目标”控件组；1-“目标”仅“单”可用；2-全开
 *  par：0-禁用“数值表”；1-“数值表”仅可用一行；2-全开
 *  dotw：0-禁用“数值表”后面的所有控件；1-全开
 */
// eventOptionItems = [{
//     code: 'Camera',
//     text: '相机控制类',
//     children: [{
//         code: 'Move',
//         text: '相机移动',
//         obj: 0,
//         par: 0,
//         dotw: 0
//     }, {
//         code: 'SetMoveTarget',
//         text: '设置相机围绕目标设置',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }]
// }, {
//     code: 'UI',
//     text: 'UI控制类',
//     children: [{
//         code: 'Position',
//         text: 'UI位移移动',
//         obj: 2,
//         par: 2,
//         dotw: 1
//     }, {
//         code: 'Scale',
//         text: 'UI位移缩放',
//         obj: 1,
//         par: 0,
//         dotw: 0
//     }, {
//         code: 'PunchScale',
//         text: 'UI位移大小抖动',
//         obj: 2,
//         par: 2,
//         dotw: 0
//     }]
// }, {
//     code: 'Audio',
//     text: '音频控制类',
//     children: [{
//         code: 'SystemVoiceDown',
//         text: '系统音量减',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }, {
//         code: 'SystemVoiceUp',
//         text: '系统音量加',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }, {
//         code: 'SystemMute',
//         text: '系统静音',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }]
// }, {
//     code: 'Speak',
//     text: '语音控制类',
//     children: [{
//         code: 'Open',
//         text: '打开文字语音播放',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }, {
//         code: 'Close',
//         text: '关闭文字语音播放',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }, {
//         code: 'PauseAndPlay',
//         text: '暂停和播放文字语音',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }]
// }, {
//     code: 'Effect',
//     text: '特效控制类',
//     children: [{
//         code: 'Close',
//         text: '关闭特效',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }, {
//         code: 'Open',
//         text: '开启特效',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }, {
//         code: 'Speed',
//         text: '设置特效速度',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }]
// }, {
//     code: 'Material',
//     text: '材质控制类',
//     children: [{
//         code: 'OpenTransparency',
//         text: '开启半透明',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }, {
//         code: 'CloseTransparency',
//         text: '关闭半透明',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }]
// }, {
//     code: 'Object',
//     text: '物体控制类',
//     children: [{
//         code: 'Move',
//         text: '移动物体',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }, {
//         code: 'Rotate',
//         text: '旋转物体',
//         obj: 1,
//         par: 1,
//         dotw: 1
//     }]
// }];