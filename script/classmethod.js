let classmethod = [{
    "code": "Camera",
    "text": "相机工具",
    "children": [{"code": "SetIsUseRightBtn", "text": "右键旋转", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "Move",
        "text": "相机移动",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "SetMoveTarget", "text": "设置相机围绕目标位置设置", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "CloseCameraControl",
        "text": "相机围绕目标点关闭",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "OpenCameraMouseControl",
        "text": "相机控制移动打开（插件版）",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "CloseCameraMouseControl",
        "text": "相机控制移动关闭（插件版）",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "CameraMaximizeShowObject", "text": "移动相机最大化显示物体", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "Open",
        "text": "开启相机",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Close", "text": "关闭相机", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Depth",
        "text": "设置相机深度",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Patent", "text": "设置相机父物体", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "CreateLimitBound",
        "text": "创建边缘限制并更改大小",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "SetLimitBound", "text": "边缘限制并更改位置", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "SetCameraRotate",
        "text": "设置相机旋转和视角限制",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {
        "code": "SetAngleZoomLimit",
        "text": "摄像机视角距离限制",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {
        "code": "AddPostProcessLayer",
        "text": "给相机添加镜头特效PostProcessLayer",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "SetZoomSpeed", "text": "滚轮缩放大小", "obj": 0, "par": 2, "dotw": 2}]
}, {
    "code": "UI",
    "text": "UI工具",
    "children": [{"code": "Position", "text": "UI位移移动", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "PunchPosition",
        "text": "UI位移位置抖动",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "Scale", "text": "UI位移缩放", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "PunchScale",
        "text": "UI位移放大缩小",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "Rotate", "text": "UI位移旋转", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "PunchRotate",
        "text": "UI位移旋转摇摆",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "Size", "text": "UI位移宽高", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "View",
        "text": "UI状态显隐",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "Operate", "text": "UI状态可操作", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Notoperate",
        "text": "UI状态不可操作",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "RayDetection", "text": "射线操作", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "NotRayDetection",
        "text": "不射线操作",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "TextColor", "text": "UI状态文字颜色", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "TextFade",
        "text": "UI状态文字显隐",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "TextContent", "text": "UI状态文字内容", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "TextColors",
        "text": "UI状态文字富文本文字颜色",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "SliderValue", "text": "UI状态滑块值", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "ScrollRectNormalizedPos",
        "text": "UI状态列表框滚动条值改变",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {
        "code": "ScrollRectHorizontaPos",
        "text": "UI状态列表框水平滚动条值改变",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {
        "code": "ScrollRectVerticalPos",
        "text": "UI状态列表框垂直滚动条值改变",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "ImageColor", "text": "UI状态图片颜色", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "ImageFade",
        "text": "UI状态图片透明度",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "ImageFillAmount", "text": "UI状态图片填充方式", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "OutlineColor",
        "text": "UI状态边缘线颜色改变",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {
        "code": "OutlineFade",
        "text": "UI状态边缘线透明度改变",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {
        "code": "LoadTextureReplaceUiSprite",
        "text": "UI加载替换图片",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "SetImagerSprite", "text": "UI替换图片", "obj": 0, "par": 2, "dotw": 2}]
}, {
    "code": "Audio",
    "text": "音频工具",
    "children": [{"code": "SystemVoiceDown", "text": "系统音量减", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "SystemVoiceUp",
        "text": "系统音量加",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "SystemMute", "text": "系统静音", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "PlayAssetByndleFileAudio",
        "text": "从AB包中找到音乐并播放",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "PlayOne", "text": "音频状态播放一次", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "PlayLoop",
        "text": "音频状态播放循环",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Pause", "text": "音频状态暂停", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Stop",
        "text": "音频状态停止",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "RePlay", "text": "音频状态重播", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Voice",
        "text": "音频状态音量",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "Speed", "text": "音频状态速度", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "StartMute",
        "text": "音频状态启动静音",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "QuitMute", "text": "音频状态取消静音", "obj": 0, "par": 0, "dotw": 2}]
}, {
    "code": "Speak",
    "text": "语音工具",
    "children": [{"code": "Open", "text": "打开文字语音播放", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "Close",
        "text": "关闭文字语音播放",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "PauseAndPlay", "text": "暂停和播放文字语音", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Speed",
        "text": "设置文字语音速度",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "Pitch", "text": "设置文字语音音高", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "Volume",
        "text": "设置文字语音大小",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }]
}, {
    "code": "Effect",
    "text": "特效工具",
    "children": [{"code": "Close", "text": "关闭特效", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Open",
        "text": "开启特效",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Speed", "text": "设置特效速度", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "Play",
        "text": "播放特效",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Pause", "text": "暂停特效", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Stop",
        "text": "停止特效",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Lifetime", "text": "设置特效粒子寿命", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "Size",
        "text": "设置粒子大小",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "CreatFlowLine", "text": "创建流线粒子", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "DestoryFlowLine",
        "text": "销毁流线粒子",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "CreatFire", "text": "加载粒子特效预制体", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "Closemulti",
        "text": "关闭特效",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Openmulti", "text": "开启特效", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Playmulti",
        "text": "播放特效",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Pausemulti", "text": "暂停特效", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Stopmulti",
        "text": "停止特效",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }]
}, {
    "code": "Material",
    "text": "材质类工具",
    "children": [{
        "code": "OpenTransparency",
        "text": "开启半透明",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "CloseTransparency", "text": "关闭半透明", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "SetFlashColor",
        "text": "设置材质高亮颜色",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "OpenFlash", "text": "开启闪烁", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "CloseFlash",
        "text": "关闭闪烁",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "SetColor", "text": "设置材质颜色", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "ReplaceMaterial",
        "text": "替换材质",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {
        "code": "ReplaceTexture",
        "text": "替换材质颜色贴图",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {
        "code": "CloseAllMaterialTransparency",
        "text": "关闭所有未选择半透明",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "OpenAllMaterialTransparency",
        "text": "打开所有未选择半透明",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "CloseAllMaterialFlash", "text": "关闭所有闪烁", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "SetAllShader",
        "text": "开启未选择物体透明",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {
        "code": "LoadTextureReplaceMaterialTexture",
        "text": "加载图片替换材质贴图",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "SetSkyBox", "text": "设置天空盒", "obj": 0, "par": 0, "dotw": 2}]
}, {
    "code": "Object",
    "text": "物体类工具",
    "children": [{"code": "PlayVideo", "text": "物体播放视频", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "VideoStart",
        "text": "视频流状态",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "Move", "text": "移动物体", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "Rotate",
        "text": "旋转物体",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "Scale", "text": "缩放物体", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "Show",
        "text": "显示物体--显示MeshRender",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Hide", "text": "隐藏物体--隐藏MeshRender", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "ShowObj",
        "text": "显示物体--显示Obj",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "HideObj", "text": "隐藏物体--隐藏Obj", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "ChildHide",
        "text": "隐藏物体及其子物体",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "ChildShow", "text": "显示物体及其子物体", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "PlayAniamtion",
        "text": "播放动画",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {
        "code": "PlayConfigAniamtion",
        "text": "播放配置动画",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "PassSortConfigAniamtion", "text": "按动画阶段暂停配置动画", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "SetPatent",
        "text": "设置物体父物体",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "OpenTranslucence", "text": "打开物体半透明", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "CloseTranslucence",
        "text": "关闭物体透明",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "OpenFlash", "text": "开启物体闪烁", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "CloseFlash",
        "text": "关闭物体闪烁",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "InstantiationObject",
        "text": "实例化物体",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {
        "code": "InstantiationAndPlayAnimation",
        "text": "实例化物体并播放默认动画",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "AnimationStatePlay", "text": "动画状态播放", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "AnimationStateStop",
        "text": "动画状态停止",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "AddColliderBox", "text": "添加ColliderBox", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "ColldierBoxSize",
        "text": "设置ColliderBox大小",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {
        "code": "RemoveColldierBox",
        "text": "移除ColliderBox",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "OpenColldierBox",
        "text": "打开ColliderBox",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "CloseColldierBoxHide",
        "text": "关闭ColliderBox",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "AddColliderCapsule",
        "text": "添加CapsuleCollider",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "ColldierCapsuleSize",
        "text": "设置CapsuleCollider大小",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {
        "code": "RemoveColldierCapsule",
        "text": "移除CapsuleColldier",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "OpenColldierCapsule",
        "text": "打开CapsuleColldier",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "CloseColldierCapsule",
        "text": "关闭CapsuleColldier",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "AddColliderSphere",
        "text": "添加SphereCollider",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "ColldierSphereSize",
        "text": "设置SphereCollider大小",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {
        "code": "RemoveColldierSphere",
        "text": "移除SphereCollider",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "OpenColldierSphere",
        "text": "打开SphereCollider",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "CloseColldierSphere",
        "text": "关闭SphereCollider",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "AddColliderMesh",
        "text": "添加MeshCollider",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "RemoveColldierMesh",
        "text": "移除MeshCollider",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "OpenColldierMesh",
        "text": "开启MeshCollider",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "CloseColldierMesh", "text": "关闭MeshCollider", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "AddScene",
        "text": "设置添加场景",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "UnLoadAddScene", "text": "卸载添加场景", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "SetLightColor",
        "text": "设置灯光颜色",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "MoveObject", "text": "移动物体到另一个物体位置", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "RotateObject",
        "text": "旋转物体跟目标物体一致",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "ScaleObject", "text": "缩放物体跟目标物体一致", "obj": 2, "par": 2, "dotw": 2}]
}, {
    "code": "3DText",
    "text": "3D类型工具",
    "children": [{"code": "3DTextColor", "text": "3D状态文字颜色", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "3DTextFade",
        "text": "3D状态文字透明度",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "3DTextContent", "text": "3D状态文字内容", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "3DPositon",
        "text": "3D状态文字位移",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "3DRotate", "text": "3D旋转物体", "obj": 2, "par": 2, "dotw": 2}, {
        "code": "3DScale",
        "text": "3D缩放物体",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }]
}, {
    "code": "Animation",
    "text": "动画工具",
    "children": [{"code": "ConfFunction", "text": "配置动画事件函数名称", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "EndFunction",
        "text": "动画片段结束事件函数名称",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }]
}, {
    "code": "MeasureSend",
    "text": "测发工具",
    "children": [{"code": "SendDotNetMsg", "text": "测发播放结束", "obj": 0, "par": 2, "dotw": 2}]
}, {
    "code": "StructureEvent",
    "text": "结构展示工具",
    "children": [{"code": "DefaultView", "text": "设置默认视图", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "LeftView",
        "text": "左视图",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "FrontView", "text": "前视图", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "TopView",
        "text": "顶视图",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "ResetMode", "text": "重置模型", "obj": 2, "par": 0, "dotw": 2}, {
        "code": "ResetMateria",
        "text": "重置模型材质",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "ResetShader", "text": "开启未选择物体透明", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "InitCameraAttribute",
        "text": "初始化相机尺寸",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "CameraDistance", "text": "相机距离", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "ShowModelSize",
        "text": "显示模型尺寸",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "HdieModelSize", "text": "隐藏模型尺寸", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "IcoButUI",
        "text": "wer快捷键",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Show", "text": "物体Mesh显示控制", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Hide",
        "text": "物体Mesh隐藏控制",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "ChildShow", "text": "显示模型", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "ChildHide",
        "text": "隐藏模型",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "ShowSelectChild", "text": "孤立显示选择模型", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "ResetSlider",
        "text": "重置滑块",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "ShowInfo", "text": "显示UI信息", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "HideInfo",
        "text": "隐藏UI信息",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "HideOrShowModelInfo", "text": "是否显示模型信息", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "AutoExplosive",
        "text": "自主拆装爆炸图",
        "obj": 2,
        "par": 2,
        "dotw": 2
    }, {"code": "SetIconButtonStart", "text": "设置图片按钮状态", "obj": 0, "par": 0, "dotw": 2}]
}, {
    "code": "Assembled",
    "text": "拆装事件工具",
    "children": [{
        "code": "IsPanelCover",
        "text": "是否显示UI面板遮挡",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "SetEventPoints", "text": "设置事件碰撞点", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "SetError",
        "text": "错误信息设置",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "SetNormal", "text": "正常信息设置", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "SetDownInfo",
        "text": "设置底部信息",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "SetTools", "text": "设置工具", "obj": 0, "par": 2, "dotw": 2}]
}, {
    "code": "AssembledExtend",
    "text": "拆装网络同步工具",
    "children": [{"code": "PlayModel", "text": "播放模型", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "OpenObjectFlash",
        "text": "开启物体闪烁",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "CloseObjectFlash", "text": "关闭物体闪烁", "obj": 0, "par": 0, "dotw": 2}]
}, {
    "code": "Weather",
    "text": "天气工具",
    "children": [{"code": "Time", "text": "时间", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "Weather",
        "text": "天气--时间插件中的天气",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {"code": "Seasons", "text": "四季--时间插件中的四季", "obj": 0, "par": 0, "dotw": 2}, {
        "code": "SetWatherNew",
        "text": "新的天气--粒子天气插件的天气",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }]
}, {
    "code": "AssembledMessage",
    "text": "拆装消息工具",
    "children": [{
        "code": "MiniStepStartProcess",
        "text": "拆装消息小步骤开始流程",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "MiniStepStepProcess",
        "text": "拆装消息小步骤步骤流程",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "MiniStepEndProcess",
        "text": "拆装消息小步骤结束流程",
        "obj": 0,
        "par": 0,
        "dotw": 2
    }, {
        "code": "UpdateMiniStepTip",
        "text": "拆装消息更新小步骤提示",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }, {"code": "UpdateMiniStepInfo", "text": "拆装消息更新小步标题", "obj": 0, "par": 2, "dotw": 2}, {
        "code": "UpdatePersonNum",
        "text": "拆装消息更新小步骤号位",
        "obj": 0,
        "par": 2,
        "dotw": 2
    }]
}]
