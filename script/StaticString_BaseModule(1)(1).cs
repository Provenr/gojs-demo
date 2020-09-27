/// ========================================================
/// 文 件 名：StaticString_BaseModule.cs
/// 作 者：贺春峰 
/// 日 期：2019/11/19 16:58:33
/// 版 本：V 1.0
/// 功 能 描 述：
/// 修 改 记 录：
/// 日期          版本        修改人        修改内容 
/// 2019/11/19   V1.0        贺春峰        添加脚本功能 
///                                                
/// ========================================================
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace EvolutionFramework
{
    public class StaticString_BaseModule
    {
        #region UtilityName  工具相关名称

        #region Utility_Camera  工具相机相关名称
        /// <summary>
        /// 相机类名
        /// </summary>
        public static string Utility_Camera = "Camera";
        /// <summary>
        /// 右键旋转
        /// #obj;#par(S);
        /// </summary>  
        public static string Utility_Camera_SetIsUseRightBtn = "SetIsUseRightBtn";
        /// <summary>
        /// 相机移动
        /// #obj;#par(V3);#dotw;
        /// </summary>  
        public static string Utility_Camera_Move = "Move";
        /// <summary>
        /// 设置相机围绕目标位置设置
        /// #obj;#par(V3);
        /// </summary>       
        public static string Utility_Camera_Set_CameraTarget = "SetMoveTarget";
        /// <summary>
        /// 相机围绕目标点关闭
        /// #obj;
        /// </summary>
        public static string Utility_Camera_Close_CameraControl = "CloseCameraControl";
        /// <summary>
        /// 相机控制移动打开（插件版）
        /// #obj;
        /// </summary>
        public static string Utility_Camera_Open_CameraMouseControl = "OpenCameraMouseControl";
        /// <summary>
        /// 相机控制移动关闭（插件版）
        /// #obj;
        /// </summary>
        public static string Utility_Camera_Close_CameraMouseControl = "CloseCameraMouseControl";
        /// <summary>
        /// 移动相机最大化显示物体
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Camera_Move_CameraMaximizeShowObject = "CameraMaximizeShowObject";
        /// <summary>
        /// 开启相机
        /// #obj;
        /// </summary>
        public static string Utility_Camera_Open = "Open";
        /// <summary>
        /// 关闭相机
        /// #obj;
        /// </summary>
        public static string Utility_Camera_Close = "Close";
        /// <summary>
        /// 设置相机深度
        /// #obj;
        /// </summary>
        public static string Utility_Camera_Set_CameraDepth = "Depth";
        /// <summary>
        /// 设置相机父物体
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Camera_Set_CameraPatent = "Patent";
        /// <summary>
        /// 创建边缘限制并更改大小
        /// #par(V3);
        /// </summary>
        public static string Utility_Camera_Create_LimitBound = "CreateLimitBound";
        /// <summary>
        /// 边缘限制并更改位置
        /// #par(V3);
        /// </summary>
        public static string Utility_Camera_Set_LimitBound = "SetLimitBound";
        /// <summary>
        /// 设置相机旋转和视角限制
        /// #obj;#par(V3);
        /// </summary>
        public static string Utility_Camera_Set_CameraRotate = "SetCameraRotate";
        /// <summary>
        /// 摄像机视角距离限制
        /// #obj;#par(V3);
        /// </summary>
        public static string Utility_Camera_Set_AngleZoomLimit = "SetAngleZoomLimit";
        /// <summary>
        /// 给相机添加镜头特效 PostProcessLayer
        /// #obj;
        /// </summary>
        public static string Utility_Camera_Add_PostProcessLayer = "AddPostProcessLayer";
        /// <summary>
        /// 滚轮缩放大小
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Camera_Set_ZoomSpeed = "SetZoomSpeed";

        #endregion

        #region Utility_UI 工具UI相关名称
        /// <summary>
        /// UI类名  
        /// </summary>
        public static string Utility_UI = "UI";
        /// <summary>
        /// UI位移移动
        /// #obj;#par(V2);#dotw;
        /// </summary>
        public static string Utility_UI_Move = "Position";
        /// <summary>
        /// UI位移位置抖动
        /// #obj;#par(V2);#dotw;
        /// </summary>
        public static string Utility_UI_Move_PunchPosition = "PunchPosition";
        /// <summary>
        /// UI位移缩放
        /// #obj;#par(V2);#dotw;
        /// </summary>
        public static string Utility_UI_Scale = "Scale";
        /// <summary>
        /// UI位移放大缩小
        /// #obj;#par(V2);#dotw;
        /// </summary>
        public static string Utility_UI_PunchScale = "PunchScale";
        /// <summary>
        /// UI位移旋转
        /// #obj;#par(V3);#dotw;
        /// </summary>
        public static string Utility_UI_Rotate = "Rotate";
        /// <summary>
        /// UI位移旋转摇摆
        /// #obj;#par(V3);#dotw;
        /// </summary>
        public static string Utility_UI_PunchRotate = "PunchRotate";
        /// <summary>
        /// UI位移宽高
        /// #obj;#par(V2);#dotw;
        /// </summary>
        public static string Utility_UI_Size = "Size";

        /// <summary>
        /// UI状态显隐
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_UI_Show_View = "View";
        /// <summary>
        /// UI状态可操作
        /// #obj;
        /// </summary>
        public static string Utility_UI_Operate = "Operate";
        /// <summary>
        /// UI状态不可操作
        /// #obj;
        /// </summary>
        public static string Utility_UI_Notoperate = "Notoperate";
        /// <summary>
        /// 射线操作
        /// #obj;
        /// </summary>
        public static string Utility_UI_RayDetection = "RayDetection";
        /// <summary>
        /// 不射线操作
        /// #obj;
        /// </summary>
        public static string Utility_UI_NotRayDetection = "NotRayDetection";
        /// <summary>
        /// UI状态文字颜色
        /// #obj;#par(C);#dotw;
        /// </summary>
        public static string Utility_UI_Set_TextColor = "TextColor";
        /// <summary>
        /// UI状态文字显隐
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_UI_Set_TextShowOfHide = "TextFade";
        /// <summary>
        /// UI状态文字内容
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_UI_Set_TextContent = "TextContent";
        /// <summary>
        /// UI状态文字富文本文字颜色
        /// #obj;#par(W);
        /// </summary>
        public static string Utility_UI_Set_TextColors = "TextColors";
        /// <summary>
        /// UI状态滑块值
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_UI_Set_SliderValue = "SliderValue";
        /// <summary>
        /// UI状态列表框滚动条值改变
        /// #obj;#par(V2);#dotw;
        /// </summary>
        public static string Utility_UI_Set_ScrollRectNormalizedPos = "ScrollRectNormalizedPos";
        /// <summary>
        /// UI状态列表框水平滚动条值改变
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_UI_Set_ScrollRectHorizontaPos = "ScrollRectHorizontaPos";
        /// <summary>
        /// UI状态列表框垂直滚动条值改变
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_UI_Set_ScrollRectVerticalPos = "ScrollRectVerticalPos";
        /// <summary>
        /// UI状态图片颜色
        /// #obj;#par(C);#dotw;
        /// </summary>
        public static string Utility_UI_Set_ImageColor = "ImageColor";
        /// <summary>
        /// UI状态图片透明度
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_UI_Set_ImageFade = "ImageFade";
        /// <summary>
        /// UI状态图片填充方式
        /// #obj;#par(V4);#dotw;
        /// </summary>
        public static string Utility_UI_Set_ImageFillAmount = "ImageFillAmount";
        /// <summary>
        /// UI状态边缘线颜色改变
        /// #obj;#par(C);#dotw;
        /// </summary>
        public static string Utility_UI_Set_OutlineColor = "OutlineColor";
        /// <summary>
        /// UI状态边缘线透明度改变
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_UI_Set_OutlineFade = "OutlineFade";
        /// <summary>
        /// UI加载替换图片
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_UI_Load_TextureReplaceUiSprite = "LoadTextureReplaceUiSprite";

        /// <summary>
        /// UI替换图片
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_UI_Set_ImagerSprite = "SetImagerSprite";
        

        #endregion

        #region Utility_Audio 工具音频相关名称
        /// <summary>
        /// 音频类名
        /// </summary>
        public static string Utility_Audio = "Audio";
        /// <summary>
        /// 系统音量减
        /// #null;
        /// </summary>     
        public static string Utility_Audio_System_VoiceDown = "SystemVoiceDown";
        /// <summary>
        /// 系统音量加
        /// #null;
        /// </summary>
        public static string Utility_Audio_System_VoiceUp = "SystemVoiceUp";
        /// <summary>
        /// //系统静音
        /// #null;
        /// </summary>
        public static string Utility_Audio_System_Mute = "SystemMute";

        /// <summary>
        /// 从AB包中找到音乐并播放
        /// #par(S);
        /// </summary>
        public static string Utility_Audio_Play_AssetByndleFileAudio = "PlayAssetByndleFileAudio";
        /// <summary>
        /// 音频状态播放一次
        /// #obj;
        /// </summary>
        public static string Utility_Audio_Play_One = "PlayOne";

        /// <summary>
        /// 音频状态播放循环
        /// #obj;
        /// </summary>
        public static string Utility_Audio_Play_Loop = "PlayLoop";
        /// <summary>
        /// 音频状态暂停
        /// #obj;
        /// </summary>
        public static string Utility_Audio_Pause = "Pause";
        /// <summary>
        /// 音频状态停止
        /// #obj;
        /// </summary>
        public static string Utility_Audio_Stop = "Stop";
        /// <summary>
        /// 音频状态重播
        /// #obj;
        /// </summary>
        public static string Utility_Audio_Replay = "RePlay";
        /// <summary>
        /// 音频状态音量
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_Audio_Set_Volume = "Voice";
        /// <summary>
        /// 音频状态速度
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_Audio_Set_Speed = "Speed";
        /// <summary>
        /// 音频状态启动静音
        /// #obj;
        /// </summary>
        public static string Utility_Audio_Start_Mute = "StartMute";
        /// <summary>
        /// 音频状态取消静音
        /// #obj;
        /// </summary>
        public static string Utility_Audio_End_Mute = "QuitMute";
        #endregion

        #region Utility_Speak 工具语音相关名称
        /// <summary>
        /// 语音类名
        /// </summary>
        public static string Utility_Speak = "Speak";
        /// <summary>
        /// 打开文字语音播放
        /// #par(S);
        /// </summary>
        public static string Utility_Speak_Open_TxtSpeak = "Open";
        /// <summary>
        /// 关闭文字语音播放
        /// #null;
        /// </summary>
        public static string Utility_Speak_Close_TxtSpeak = "Close";
        /// <summary>
        /// 暂停和播放文字语音
        /// #null;
        /// </summary>
        public static string Utility_Speak_PauseAndPlay_TxtSpeak = "PauseAndPlay";
        /// <summary>
        /// 设置文字语音速度
        /// #par(S);
        /// </summary>
        public static string Utility_Speak_Play_TxtSpeakSpeed = "Speed";
        /// <summary>
        /// 设置文字语音音高
        /// #par(S);
        /// </summary>
        public static string Utility_Speak_Play_TxtSpeakPitch = "Pitch";
        /// <summary>
        /// 设置文字语音大小
        /// #par(S);
        /// </summary>
        public static string Utility_Speak_Play_TxtSpeakVolume = "Volume";
        #endregion

        #region Utility_Effect 工具特效相关名称
        /// <summary>
        /// 特效类名
        /// </summary>
        public static string Utility_Effect = "Effect";
        /// <summary>
        /// 关闭特效
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Close = "Close";
        /// <summary>
        /// 开启特效
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Open = "Open";
        /// <summary>
        /// 设置特效速度
        /// #obj;#par(S); 
        /// </summary>
        public static string Utility_Effect_Set_EffectSpeed = "Speed";
        /// <summary>
        /// 播放特效
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Play = "Play";
        /// <summary>
        /// 暂停特效
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Pause = "Pause";
        /// <summary>
        /// 停止特效
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Stop = "Stop";
        /// <summary>
        /// 设置特效粒子寿命
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_Effect_Set_EffectLifetime = "Lifetime";
        /// <summary>
        /// 设置粒子大小
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_Effect_Set_EffectSize = "Size";
        /// <summary>
        /// 创建流线粒子
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Effect_Creat_FlowLine = "CreatFlowLine";
        /// <summary>
        /// 销毁流线粒子
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Destory_FlowLine = "DestoryFlowLine";
        /// <summary>
        /// 加载粒子特效预制体
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Effect_Creat_Fire = "CreatFire";

        #region 多个粒子特效名称
        /// <summary>
        /// 关闭特效
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Close_multi = "Closemulti";
        /// <summary>
        /// 开启特效
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Open_multi = "Openmulti";

        /// <summary>
        /// 播放特效
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Play_multi = "Playmulti";
        /// <summary>
        /// 暂停特效
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Pause_multi = "Pausemulti";
        /// <summary>
        /// 停止特效
        /// #obj;
        /// </summary>
        public static string Utility_Effect_Stop_multi = "Stopmulti";

        #endregion


        #endregion

        #region Utility_Material 工具材质相关名称
        /// <summary>
        /// 材质类类名
        /// </summary>
        public static string Utility_Material = "Material";
        /// <summary>
        /// 开启半透明
        /// #obj;
        /// </summary>
        public static string Utility_Material_Open_MaterialTransparency = "OpenTransparency";
        /// <summary>
        /// 关闭半透明
        /// #obj;
        /// </summary>
        public static string Utility_Material_Close_MaterialTransparency = "CloseTransparency";
        /// <summary>
        /// 设置材质高亮颜色
        /// #obj;#par(C);
        /// </summary>
        public static string Utility_Material_Set_FlashColor = "SetFlashColor";
        /// <summary>
        /// 开启闪烁
        /// #obj;
        /// </summary>
        public static string Utility_Material_Open_MaterialFlash = "OpenFlash";
        /// <summary>
        /// 关闭闪烁
        /// #obj;
        /// </summary>
        public static string Utility_Material_Close_MaterialFlash = "CloseFlash";
        /// <summary>
        /// 设置材质颜色
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Material_Set_MaterialColor = "SetColor";
        /// <summary>
        /// 替换材质
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Material_Replace_Material = "ReplaceMaterial";
        /// <summary>
        /// 替换材质颜色贴图
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Material_Replace_MaterialMainTexture = "ReplaceTexture";
        /// <summary>
        /// 关闭所有未选择半透明
        /// #obj;
        /// </summary>
        public static string Utility_Material_Replace_CloseAllMaterialTransparency = "CloseAllMaterialTransparency";
        /// <summary>
        /// 打开所有未选择半透明
        /// #obj;
        /// </summary>
        public static string Utility_Material_Replace_OpenAllMaterialTransparency = "OpenAllMaterialTransparency";
        /// <summary>
        /// 关闭所有闪烁
        /// #obj;
        /// </summary>
        public static string Utility_Material_Replace_CloseAllMaterialFlash = "CloseAllMaterialFlash";

        /// <summary>
        /// 开启未选择物体透明
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Material_Replace_SetAllShader = "SetAllShader";

        /// <summary>
        /// 加载图片替换材质贴图
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Material_Load_TextureReplaceMaterialTexture = "LoadTextureReplaceMaterialTexture";

        /// <summary>
        /// 设置天空盒
        /// #obj;
        /// </summary>
        public static string Utility_Material_Set_SkyBox = "SetSkyBox";
      
        #endregion

        #region Utility_Object 工具物体相关名称
        #region 


        #endregion

        /// <summary>
        /// 物体类类名
        /// </summary>
        public static string Utility_Object = "Object";
        /// <summary>
        /// 物体播放视频
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Object_PlayVideo = "PlayVideo";
        /// <summary>
        /// 视频流状态
        /// #par(S);
        /// </summary>
        public static string Utility_Object_VideoStart = "VideoStart";
        /// <summary>
        /// 移动物体
        /// #obj;#par(v3);#dotw;
        /// </summary>
        public static string Utility_Object_Move = "Move";
        /// <summary>
        /// 旋转物体
        /// #obj;#par(v3);#dotw;
        /// </summary>
        public static string Utility_Object_Rotate = "Rotate";
        /// <summary>
        /// 缩放物体
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static string Utility_Object_Scale = "Scale";
        /// <summary>
        /// 显示物体 -- 显示MeshRender
        /// #obj;
        /// </summary>
        public static string Utility_Object_Show = "Show";
        /// <summary>
        /// 隐藏物体 -- 隐藏MeshRender
        /// #obj;
        /// </summary>
        public static string Utility_Object_Hide = "Hide";
        /// <summary>
        /// 显示物体 -- 显示Obj
        /// #obj;
        /// </summary>
        public static string Utility_Object_ShowObj = "ShowObj";
        /// <summary>
        /// 隐藏物体 -- 隐藏Obj
        /// #obj;
        /// </summary>
        public static string Utility_Object_HideObj = "HideObj";
        /// <summary>
        /// 隐藏物体及其子物体
        /// #obj;
        /// </summary>
        public static string Utility_Object_ChildHide = "ChildHide";
        /// <summary>
        /// 显示物体及其子物体
        /// #obj;
        /// </summary>
        public static string Utility_Object_ChildShow = "ChildShow";
        /// <summary>
        /// 播放动画
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Object_Play_ObjectAniamtion = "PlayAniamtion";
        /// <summary>
        /// 播放配置动画
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Object_Play_ObjectConfigAniamtion = "PlayConfigAniamtion";
        /// <summary>
        /// 按动画阶段暂停配置动画
        /// #obj;
        /// </summary>
        public static string Utility_Object_Pass_ObjectSortConfigAniamtion = "PassSortConfigAniamtion";
        /// <summary>
        /// 设置物体父物体
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Object_Set_ObjcetPatent = "SetPatent";
        /// <summary>
        /// 打开物体半透明
        /// #obj;
        /// </summary>
        public static string Utility_Object_Open_ObjectTranslucence = "OpenTranslucence";
        /// <summary>
        /// 关闭物体透明
        /// #obj;
        /// </summary>
        public static string Utility_Object_Close_ObjectTranslucence = "CloseTranslucence";
        /// <summary>
        /// 开启物体闪烁
        /// #obj;
        /// </summary>
        public static string Utility_Object_Open_ObjectFlash = "OpenFlash";
        /// <summary>
        /// 关闭物体闪烁
        /// #obj;
        /// </summary>
        public static string Utility_Object_Close_ObjectFlash = "CloseFlash";
        /// <summary>
        /// 实例化物体
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Object_Instantiation_Object = "InstantiationObject";
        /// <summary>
        /// 实例化物体并播放默认动画
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Object_Instantiation_ObjectAndPlayAnimation = "InstantiationAndPlayAnimation";
        /// <summary>
        /// 动画状态播放
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Object_AnimationState_Play = "AnimationStatePlay";
        /// <summary>
        ///动画状态停止
        ///#obj;
        /// </summary>
        public static string Utility_Object_AnimationState_Stop = "AnimationStateStop";
        /// <summary>
        /// 添加ColliderBox
        /// #obj;
        /// </summary>
        public static string Utility_Object_Add_BoxCollider = "AddColliderBox";
        /// <summary>
        /// 设置ColliderBox大小
        /// #obj;#par(V3);
        /// </summary>
        public static string Utility_Object_Set_BoxColldierSize = "ColldierBoxSize";
        /// <summary>
        /// 移除ColliderBox
        /// #obj;
        /// </summary>
        public static string Utility_Object_Remove_BoxColldier = "RemoveColldierBox";
        /// <summary>
        /// 打开ColliderBox
        /// #obj;
        /// </summary>
        public static string Utility_Object_Open_BoxColldier = "OpenColldierBox";
        /// <summary>
        /// 关闭ColliderBox
        /// #obj;
        /// </summary>
        public static string Utility_Object_Close_BoxColldier = "CloseColldierBoxHide";
        /// <summary>
        /// 添加CapsuleCollider
        /// #obj;
        /// </summary>
        public static string Utility_Object_Add_CapsuleCollider = "AddColliderCapsule";
        /// <summary>
        /// 设置CapsuleCollider大小
        /// #obj;#par(V3);
        /// </summary>
        public static string Utility_Object_Set_CapsuleColldierSize = "ColldierCapsuleSize";
        /// <summary>
        /// 移除CapsuleColldier
        /// #obj;
        /// </summary>
        public static string Utility_Object_Remove_CapsuleColldier = "RemoveColldierCapsule";
        /// <summary>
        /// 打开CapsuleColldier
        /// #obj;
        /// </summary>
        public static string Utility_Object_Open_CapsuleColldier = "OpenColldierCapsule";
        /// <summary>
        /// 关闭CapsuleColldier
        /// #obj;
        /// </summary>
        public static string Utility_Object_Close_CapsuleColldier = "CloseColldierCapsule";
        /// <summary>
        /// 添加SphereCollider
        /// #obj;
        /// </summary>
        public static string Utility_Object_Add_SphereCollider = "AddColliderSphere";
        /// <summary>
        /// 设置SphereCollider大小
        /// #obj;#par(V3);
        /// </summary>
        public static string Utility_Object_Set_SphereColldierSize = "ColldierSphereSize";
        /// <summary>
        /// 移除SphereCollider
        /// #obj;
        /// </summary>
        public static string Utility_Object_Remove_SphereColldier = "RemoveColldierSphere";
        /// <summary>
        /// 打开SphereCollider
        /// #obj;
        /// </summary>
        public static string Utility_Object_Open_SphereColldier = "OpenColldierSphere";
        /// <summary>
        /// 关闭SphereCollider
        /// #obj;
        /// </summary>
        public static string Utility_Object_Close_SphereColldier = "CloseColldierSphere";
        /// <summary>
        /// 添加MeshCollider
        /// #obj;
        /// </summary>
        public static string Utility_Object_Add_MeshCollider = "AddColliderMesh";
        /// <summary>
        /// 移除MeshCollider
        /// #obj;
        /// </summary>
        public static string Utility_Object_Remove_MeshColldier = "RemoveColldierMesh";
        /// <summary>
        /// 开启MeshCollider
        /// #obj;
        /// </summary>
        public static string Utility_Object_Open_MeshColldier = "OpenColldierMesh";
        /// <summary>
        /// 关闭MeshCollider
        /// #obj;#par(S);
        /// </summary>
        public static string Utility_Object_Close_MeshColldier = "CloseColldierMesh";
        /// <summary>
        /// 设置添加场景
        /// #obj;
        /// </summary>
        public static string Utility_Object_Set_Scene = "AddScene";
        /// <summary>
        /// 卸载添加场景
        /// #obj;
        /// </summary>
        public static string Utility_Object_UnLoad_AddScene = "UnLoadAddScene";
        /// <summary>
        /// 设置灯光颜色
        /// #obj;#par(C);
        /// </summary>
        public static string Utility_Object_Set_LightColor = "SetLightColor";
        /// <summary>
        /// 移动物体到另一个物体位置
        /// #obj;#par(S);#dotw
        /// </summary>
        public static string Utility_Object_MoveToOther = "MoveObject";
        /// <summary>
        /// 旋转物体跟目标物体一致
        /// #obj;#par(S);#dotw
        /// </summary>
        public static string Utility_Object_RotateToOther = "RotateObject";
        /// <summary>
        /// 缩放物体跟目标物体一致
        /// #obj;#par(S);#dotw
        /// </summary>
        public static string Utility_Object_ScaleToOther = "ScaleObject";

        #endregion

        #region 3D类物体
        /// <summary>
        /// 3D类型类名
        /// </summary>
        public static string Utilty_3d_Object = "3DText";
        /// <summary>
        ///  3D状态文字颜色
        ///  #obj;#par(C);#dotw;
        /// </summary>
        public static string Utilty_3d_Object_TextColor = "3DTextColor";
        /// <summary>
        ///  3D状态文字透明度
        ///  #obj;#par(S);
        /// </summary>
        public static string Utilty_3d_Object_Set_TextAlpha = "3DTextFade";
        /// <summary>
        ///  3D状态文字内容
        ///  #obj;#par(S);
        /// </summary>
        public static string Utilty_3d_Object_Set_TextContent = "3DTextContent";
        /// <summary>
        ///  3D状态文字位移
        ///  #obj;#par(V3);#dotw;
        /// </summary>
        public static string Utilty_3d_Object_Move = "3DPositon";
        /// <summary>
        /// 3D旋转物体
        /// #obj;#par(V3);#dotw;
        /// </summary>
        public static string Utilty_3d_Objec_Rotate = "3DRotate";
        /// <summary>
        /// 3D缩放物体
        /// #obj;#par(V3);#dotw;
        /// </summary>
        public static string Utilty_3d_Objec_Scale = "3DScale";
        #endregion

        #region 动画事件函数名称

        /// <summary>
        /// 动画类名
        /// </summary>
        public const string Module_Animation = "Animation";

        /// <summary>
        /// 配置动画事件函数名称
        /// #null;
        /// </summary>
        public static string Module_Animation_ConfFunctionName = "ConfFunction";
        /// <summary>
        /// 动画片段结束事件函数名称
        /// #null;
        /// </summary>
        public static string Module_Animation_EndFunctionName = "EndFunction";
        #endregion

        #region 测发 模块

        /// <summary>
        /// 测发类名
        /// </summary>
        public const string Module_MeasureSend = "MeasureSend";

        /// <summary>
        /// 测发 播放结束
        /// #par(S);
        /// </summary>
        public const string Module_MeasureSend_SendDotNetMsg = "SendDotNetMsg";

        #endregion

        #region UI相关

        #endregion

        #region 结构展示模块
        /// <summary>
        /// 结构展示类名
        /// </summary>
        public static readonly string Module_Structure = "StructureEvent";

        /// <summary>
        /// 设置默认视图
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_DefaultView = "DefaultView";

        /// <summary>
        /// 左视图
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_LeftViewStr = "LeftView";

        /// <summary>
        /// 前视图
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_FrontViewStr = "FrontView";

        /// <summary>
        /// 顶视图
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_TopViewStr = "TopView";

        /// <summary>
        /// 重置模型
        /// #obj;#dotw;
        /// </summary>
        public static readonly string Module_Structure_ResetModeStr = "ResetMode";

        /// <summary>
        /// 重置模型材质
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_ResetMateriaStr = "ResetMateria";

        /// <summary>
        /// 开启未选择物体透明
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_ResetShaderStr = "ResetShader";

        /// <summary>
        /// 初始化相机尺寸
        /// #obj;#par(V3);
        /// </summary>
        public static readonly string Module_Structure_InitCameraAttribute = "InitCameraAttribute";

        /// <summary>
        /// 相机距离
        /// #obj;#par(S);
        /// </summary>
        public static readonly string Module_Structure_CameraDistance = "CameraDistance";

        /// <summary>
        /// 显示模型尺寸
        /// #obj;#par(S);
        /// </summary>
        public static readonly string Module_Structure_ShowModelSize = "ShowModelSize";

        /// <summary>
        /// 隐藏模型尺寸
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_HideModelSize = "HdieModelSize";

        /// <summary>
        /// wer快捷键
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_IcoButUI = "IcoButUI";

        /// <summary>
        /// 物体Mesh显示控制
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_Show = "Show";

        /// <summary>
        /// 物体Mesh隐藏控制
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_Hide = "Hide";

        /// <summary>
        /// 显示模型
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_ChildShow = "ChildShow";

        /// <summary>
        /// 隐藏模型
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_ChildHide = "ChildHide";

        /// <summary>
        /// 孤立显示选择模型
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_ShowSelectChild = "ShowSelectChild";

        /// <summary>
        /// 重置滑块
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_ResetSlider = "ResetSlider";

        /// <summary>
        /// 显示UI信息
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_ShowInfo = "ShowInfo";

        /// <summary>
        /// 隐藏UI信息
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_HideInfo = "HideInfo";

        /// <summary>
        /// 是否显示模型信息
        /// #par(S);
        /// </summary>
        public static readonly string Module_Structure_HideOrShowModelInfo = "HideOrShowModelInfo";

        /// <summary>
        /// 自主拆装  爆炸图
        /// #obj;#par(S);#dotw;
        /// </summary>
        public static readonly string Module_Structure_AutoExplosive = "AutoExplosive";

        /// <summary>
        /// 设置图片按钮状态
        /// #obj;
        /// </summary>
        public static readonly string Module_Structure_SetIconButtonStart = "SetIconButtonStart";

        #endregion

        #region 拆装模块

        /// <summary>
        /// 拆装事件类名
        /// </summary>
        public static readonly string Module_Assembled = "Assembled";

        /// <summary>
        /// 是否显示UI面板遮挡
        /// #par(S);
        /// </summary>
        public static readonly string Module_Assembled_Panel_Cover = "IsPanelCover";

        /// <summary>
        /// 设置事件碰撞点
        /// #obj;#par(S);
        /// </summary>
        public static readonly string Module_Assembled_SetEventPoints = "SetEventPoints";
        /// <summary>
        /// 错误信息设置
        /// #par(S);
        /// </summary>
        public static readonly string Module_Assembled_SetError = "SetError";
        /// <summary>
        /// 正常信息设置
        /// #par(S);
        /// </summary>
        public static readonly string Module_Assembled_SetNormal = "SetNormal";

        /// <summary>
        /// 设置底部信息
        /// #par(S);
        /// </summary>
        public static readonly string Module_Assembled_SetDownInfo = "SetDownInfo";

        /// <summary>
        /// 设置工具
        /// #par(S);
        /// </summary>
        public static readonly string Module_Assembled_SetTools = "SetTools";

        #endregion

        #region 拆装模块 网络

        /// <summary>
        /// 拆装网络同步类名
        /// </summary>
        public static readonly string Module_AssembledMultiplayer = "AssembledExtend";

        /// <summary>
        /// 播放模型
        /// #obj;
        /// </summary>
        public static readonly string Module_AssembledMultiplayer_PlayModel = "PlayModel";

        /// <summary>
        /// 开启物体闪烁
        /// #obj;
        /// </summary>
        public static readonly string Module_AssembledMultiplayer_OpenObjectFlash = "OpenObjectFlash";

        /// <summary>
        /// 关闭物体闪烁
        /// #obj;
        /// </summary>
        public static readonly string Module_AssembledMultiplayer_CloseObjectFlash = "CloseObjectFlash";
        
        #endregion

        #region 天气插件

        /// <summary>
        /// 天气类名
        /// </summary>
        public static string Addon_Weather = "Weather";

        /// <summary>
        /// 时间
        /// #obj;
        /// </summary>
        public static string Addon_Weather_TimeStr = "Time";

        /// <summary>
        /// 天气 -- 时间插件中的天气
        /// #obj;
        /// </summary>
        public static string Addon_Weather_WeatherStr = "Weather";

        /// <summary>
        /// 四季 -- 时间插件中的四季
        /// #obj;
        /// </summary>
        public static string Addon_Weather_SeasonsStr = "Seasons";

        /// <summary>
        /// 新的天气 -- 粒子天气插件的天气
        /// #obj;#par(S);
        /// </summary>
        public static string Addon_Weather_SetWatherNew = "SetWatherNew";

        #endregion

        #region 拆装
        /// <summary>
        /// 拆装消息类名
        /// </summary>
        public static string AssembledMessage_ClassName = "AssembledMessage";

        /// <summary>
        /// 拆装消息  小步骤开始流程
        /// #null;
        /// </summary>
        public static string AssembledMessage_MiniStepStartProcessStr = "MiniStepStartProcess";
        /// <summary>
        /// 拆装消息 小步骤步骤流程
        /// #null;
        /// </summary>
        public static string AssembledMessage_MiniStepStepProcessStr = "MiniStepStepProcess";
        /// <summary>
        /// 拆装消息 小步骤 结束流程
        /// #null;
        /// </summary>
        public static string AssembledMessage_MiniStepEndProcessStr = "MiniStepEndProcess";

        /// <summary>
        /// 拆装消息 更新小步骤提示
        /// #par(S);
        /// </summary>
        public static string AssembledMessage_UpdateMiniStepTip = "UpdateMiniStepTip";

        /// <summary>
        /// 拆装消息 更新小步标题
        /// #par(S);
        /// </summary>
        public static string AssembledMessage_UpdateMiniStepInfo = "UpdateMiniStepInfo";

        /// <summary>
        /// 拆装消息 更新小步骤号位
        /// #par(S);
        /// </summary>
        public static string AssembledMessage_UpdatePersonNum = "UpdatePersonNum";
        #endregion
        #endregion
    }
}
