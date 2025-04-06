import React, { useState } from "react";
import { View, Button, ScrollView, Text, StyleSheet } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import elementsData from "../../data/jsons/male.json";

const getIrisFillColor = (fill: string) => {
    switch (fill) {
        case "tone":
            return "#4e60a3";
        case "sd1":
            return "#3b4a87";
        case "sd2":
            return "#5b6ea6";
        case "sd3":
            return "#7c91c3";
        case "hl1":
            return "#a7b8e0";
        case "hl2":
            return "#c8d6f0";
        case "hl3":
            return "#e6ecfa";
        default:
            return fill;
    }
};

const getFillColor = (fillType: string) => {
    switch (fillType) {
        case "tone":
            return "#f3d4cf";
        case "sd1":
            return "#000000";
        case "sd2":
            return "#f3d4cf";
        case "sd3":
            return "#6e5b52";
        default:
            return fillType;
    }
};

const elementsInfo = elementsData.elementsInfo;

// Type or json structure with object maps
// 📌 Beard *******************************************************************************************************
type BeardPaths = { [key: string]: { path: string; fill: string; }[]; };

const beardShapesRaw = Object.assign({}, ...elementsInfo.beard.shapes) as BeardPaths;
const beardShapeIds = Object.keys(beardShapesRaw);


// 📌 Ears ********************************************************************************************************
type EarPart = { path: string; fill: string };
type EarShape = { left: EarPart[]; right: EarPart[] };


const rawEarsData: EarShape[] = elementsInfo.ears.shapes as EarShape[];
const earIds = rawEarsData.map((_, index) => index);


// 📌 Eyebrows ****************************************************************************************************
type EyebrowPart = { path: string; fill: string };
type EyebrowShape = { left: EyebrowPart[]; right: EyebrowPart[] };

const rawEyebrowData: EyebrowShape[] = elementsInfo.eyebrows.shapes as EyebrowShape[];
const eyebrowsIds = rawEyebrowData.map((_, index) => index);


// 📌 Clothes *****************************************************************************************************
type ClothesPaths = { [key: string]: { path: string; fill: string }[]; };

const clothesShapesRaw = Object.assign({}, ...elementsInfo.clothes.shapes) as ClothesPaths;
const clothesShapeIds = Object.keys(clothesShapesRaw);


// 📌 Eyes-front *************************************************************************************************
type EyesShape = { left: { path: string; fill: string }[]; right: { path: string; fill: string }[]; };
type EyesFrontShapes = { [key: string]: EyesShape; };

const eyesFrontRaw = elementsInfo.eyesfront.shapes;
const eyesFrontShapes = eyesFrontRaw.reduce((acc, shapeObj, index) => { acc[(index + 1).toString()] = shapeObj; return acc; }, {} as EyesFrontShapes);
const eyesFrontShapeIds = Object.keys(eyesFrontShapes);


// 📌 Eyes-back *************************************************************************************************
type EyesBackShape = { leftEyeBack: { path: string; fill: string }[]; rightEyeBack: { path: string; fill: string }[]; };
type EyesBackShapes = { [key: string]: EyesBackShape; };

const eyesBackRawShapes = elementsInfo.eyesback.shapes;
const eyesBackShapes = eyesBackRawShapes.reduce((acc, shapeObj, index) => { acc[(index + 1).toString()] = shapeObj; return acc; }, {} as EyesBackShapes);
const eyesBackShapeIds = Object.keys(eyesBackShapes);


// 📌 Iris ********************************************************************************************************
type IrisShape = { left: { path: string; fill: string }[]; right: { path: string; fill: string }[]; };
type EyesIrisShapes = { [key: string]: IrisShape; };

const irisRawShapes = elementsInfo.eyesiris.shapes;
const irisShapes = irisRawShapes.reduce((acc, shapeObj, index) => { acc[(index + 1).toString()] = shapeObj; return acc; }, {} as EyesIrisShapes);
const irisShapeIds = Object.keys(irisShapes);


// 📌 FaceShape **************************************************************************************************
type FaceShape = { faceShapeSingle: { path: string; fill: string }[]; };
type FaceShapes = { [key: string]: FaceShape };

const faceShapeRaw = elementsInfo.faceshape.shapes;
const faceShapes = faceShapeRaw.reduce((acc, shapeObj, index) => { acc[(index + 1).toString()] = { faceShapeSingle: shapeObj.single }; return acc; }, {} as FaceShapes);
const faceShapeIds = Object.keys(faceShapes);

// 📌 Hair *******************************************************************************************************
type HairPath = { path: string; fill: string; };
type HairShape = { front: HairPath[]; };
type HairShapes = { [id: string]: HairShape; };

const hairRawShapes = elementsInfo.hair.shapes;
const hairShapes: HairShapes = hairRawShapes.reduce((acc, shapeObj, index) => { acc[(index + 1).toString()] = { front: shapeObj.front }; return acc; }, {} as HairShapes);


const AvatarCustomization = () => {

    // 📌 Beard ***************************************************************************************************
    const [selectedBeardId, setSelectedBeardId] = useState(beardShapeIds[0]);
    const currentBeardPaths = beardShapesRaw[selectedBeardId] || [];

    // 📌 Ears ****************************************************************************************************
    const [selectedEarId, setSelectedEarId] = useState(0);

    // 📌 Eyebrows ************************************************************************************************
    const [selectedEyebrowId, setSelectedEyebrowId] = useState(0);

    // 📌 Clothes *************************************************************************************************
    const [currentClothesId, setCurrentClothesId] = useState(clothesShapeIds[0]);
    const currentPaths = clothesShapesRaw[currentClothesId];

    // 📌 Eyes-font ***********************************************************************************************
    const [currentEyesId, setCurrentEyesId] = useState(eyesFrontShapeIds[0]);
    const currentEye = eyesFrontShapes[currentEyesId];
    const leftEye = currentEye.left;
    const rightEye = currentEye.right;

    // 📌 Eyes-back ***********************************************************************************************
    const [selectedEyeBackId, setSelectedEyeBackId] = useState(eyesBackShapeIds[0]);
    const { leftEyeBack, rightEyeBack } = eyesBackShapes[selectedEyeBackId];

    // 📌 Iris ****************************************************************************************************
    const [selectedIrisId, setSelectedIrisId] = useState(irisShapeIds[0]);
    const { left, right } = irisShapes[selectedIrisId];

    // 📌 FaceShape ***********************************************************************************************
    const [selectedFaceShapeId, setSelectedFaceShapeId] = useState("1");

    // 📌 Hair ****************************************************************************************************
    const [selectedHairId, setSelectedHairId] = useState("1");



    return (
        <>
            <View style={{ "width": "100%", "marginTop": 12, "marginBottom": 16, "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                <Svg width="200" height="200" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet">
                    {/* <Defs /> */}
                    <G id="svga-group-wrapper">
                        {/* Background */}
                        <G id="svga-group-backs-single">
                            <Path id="SvgjsPath3085" d="M0 0h200v200H0V0z" data-colored="true" data-fillType="tone" data-strokeType="none" fill="#333" strokeWidth="1" opacity="1" />
                        </G>

                        {/* Human Body */}
                        <G id="svga-group-humanwrap-move" transform="matrix(1,0,0,1,0,0)">
                            <G id="svga-group-humanwrap" transform="matrix(1,0,0,1,0,0)">
                                {/* Hair back */}
                                <G id="svga-group-hair-back-move" transform="matrix(1,0,0,1,0,0)">
                                    <G id="svga-group-hair-back" transform="matrix(1,0,0,1,0,0)" />
                                </G>

                                {/* Human Body */}
                                <G id="svga-group-humanbody-back">
                                    <Path id="SvgjsPath3152" d="m168.5 219.5-1.7-21.5s.7-9-8.8-15.3-23.4-10.1-29.5-14.2c-6.1-4.1-9.2-4.5-9-16.9s.9-40.3.9-40.3H79.6s.7 27.9.9 40.3c.2 12.4-2.9 12.8-9 16.9-6.1 4.1-20 7.9-29.5 14.2S33.2 198 33.2 198l-1.6 21.5h136.9z" data-colored="true" data-fillType="tone" data-strokeType="none" fill="#f3d4cf" strokeWidth="1" opacity="1" />
                                </G>

                                {/* Chin shadow */}
                                <G id="svga-group-chinshadow-single">
                                    <Path id="SvgjsPath3148" d="M80.4 155.4c5.9 5.8 12.6 9.3 19.6 9.3s13.7-3.5 19.6-9.3c-.1-1.1-.1-2.4-.1-3.8.2-12.4.9-40.3.9-40.3H79.6s.7 27.9.9 40.3c0 1.4 0 2.7-.1 3.8z" data-colored="true" data-fillType="sd2" data-strokeType="none" fill="#d4958a" strokeWidth="1" opacity="0.65" />
                                </G>

                                {/* Humanbody */}
                                <G id="svga-group-humanbody-front">
                                    <Path id="SvgjsPath3153" d="M73.8 175.9c5.1 2.9 11.8 5.2 17.6 5.7.4 0 .4-.6.1-.7-2.8-1.1-5.9-1.7-8.8-2.6-2.9-.9-5.8-2-8.8-2.7-.1-.1-.3.2-.1.3zm35.2 6.2c5.3-.6 11.3-3 15.9-5.8.3-.2.1-.6-.2-.5-2.6.9-5.2 2-7.8 2.9-2.6.9-5.4 1.5-8 2.5-.5.1-.5.9.1.9z" data-colored="true" data-fillType="sd2" data-strokeType="none" fill="#d4958a" strokeWidth="1" opacity="1" />
                                    <Path id="SvgjsPath3154" d="m168.4 219.4-2.1-21.4c0-2.2-.5-4.5-1.5-6.6-.9-2.1-2.3-3.9-3.9-5.5s-3.5-2.8-5.5-4c-2-1.2-4.1-2.2-6.2-3.1-4.2-1.9-8.6-3.6-12.9-5.4-2.2-.9-4.3-1.9-6.4-3-1.1-.6-2.1-1.2-3-1.9-1-.6-2-1.2-3-1.9s-2-1.5-2.8-2.6c-.8-1-1.3-2.2-1.7-3.4-.7-2.4-.8-4.8-.8-7.2 0-4.7.2-9.4.3-14.1.2-9.4.6-18.7.9-28l.6.6-20.4-.2-20.4-.1.3-.3.7 28c.1 4.7.3 9.3.4 14 0 2.4-.1 4.7-.8 7.1-.3 1.2-.9 2.3-1.6 3.3-.8 1-1.7 1.8-2.7 2.5s-2 1.3-2.9 2c-.9.6-1.9 1.3-3 1.9-2.1 1.2-4.2 2.1-6.4 3.1-4.3 1.9-8.6 3.6-12.8 5.6-2.1 1-4.2 2.1-6.1 3.2-2 1.2-3.8 2.4-5.4 4-1.6 1.6-2.9 3.4-3.8 5.4-.4 1-.8 2.1-1 3.1-.2 1.1-.4 2.2-.3 3.2v.2l-1.5 21.5-1-1.1 34 .1c11.3 0 22.7.1 34.1.2l34.2.3 34.4.5zm.2.2-34 .4-34.2.3c-11.4.1-22.9.2-34.4.2l-34.4.1h-1.1l.1-1.1 1.7-21.5v.1c-.1-5.1 2.2-9.8 5.7-13.3 1.7-1.7 3.8-3.1 5.8-4.3 2-1.2 4.2-2.2 6.3-3.2 4.3-2 8.7-3.7 13-5.4 2.1-.9 4.3-1.8 6.3-2.9 1-.5 1.9-1.1 3-1.8 1-.6 2-1.2 2.9-1.9.9-.6 1.8-1.4 2.4-2.2.7-.9 1.2-1.9 1.5-2.9.6-2.1.8-4.5.8-6.8 0-4.6-.1-9.3-.2-14l-.6-28v-.3h.3l20.4-.1 20.4-.2h.6v.6c-.1 9.3-.2 18.7-.4 28-.1 4.7-.2 9.4-.2 14 .1 2.3.2 4.6.8 6.7.3 1.1.8 2 1.4 2.9.6.8 1.4 1.6 2.4 2.2.9.6 1.9 1.3 2.9 1.9 1 .7 1.9 1.3 2.9 1.8 2 1.1 4.1 2.1 6.3 3 4.3 1.8 8.6 3.6 12.9 5.6 2.1 1 4.2 2.1 6.2 3.3 2 1.2 4 2.6 5.7 4.3 3.4 3.4 5.6 8.1 5.4 13v-.1l1.4 21.6zm-112.8-.4 1.9-13.8.1 13.8h-2zm88.6 0-1.9-13.8-.1 13.8h2z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1" />
                                </G>

                                {/* Clothes */}
                                <G id="svga-group-clothes-single">
                                    {currentPaths.map((pathObj, index) => (
                                        <Path key={index} d={pathObj.path} fill="#900000" strokeWidth="1" opacity="1" data-fillType={pathObj.fill} data-colored="true" data-strokeType="none" />
                                    ))}
                                </G>

                                {/* Head */}
                                <G id="svga-group-head" transform="matrix(1,0,0,1,0,0)">
                                    {/* Left Ear */}
                                    <G id="svga-group-ears-left-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-ears-left" transform="matrix(1,0,0,1,0,0)">
                                            {rawEarsData[selectedEarId]?.left.map((shape, index) => (
                                                <Path
                                                    key={`left-ear-${index}`}
                                                    d={shape.path}
                                                    fill="#F3D4CF"
                                                    strokeWidth="1"
                                                    opacity="1"
                                                    data-fillType={shape.fill}
                                                    data-colored="true"
                                                    data-strokeType="none"
                                                />
                                            ))}
                                        </G>
                                    </G>

                                    {/* Right Ear */}
                                    <G id="svga-group-ears-right-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-ears-right" transform="matrix(1,0,0,1,0,0)">
                                            {rawEarsData[selectedEarId]?.right.map((shape, index) => (
                                                <Path
                                                    key={`right-ear-${index}`}
                                                    d={shape.path}
                                                    fill="#F3D4CF"
                                                    strokeWidth="1"
                                                    opacity="1"
                                                    data-fillType={shape.fill}
                                                    data-colored="true"
                                                    data-strokeType="none"
                                                />
                                            ))}
                                        </G>
                                    </G>

                                    {/* Face shape */}
                                    <G id="svga-group-faceshape-wrap" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-faceshape-single">
                                            {faceShapes[selectedFaceShapeId]?.faceShapeSingle.map((pathObj, idx) => (
                                                <Path key={`face-shape-${idx}`} d={pathObj.path} fill={getFillColor(pathObj.fill)} stroke="none" strokeWidth={1} opacity={1} data-fillType={pathObj.fill} data-colored="true" />
                                            ))}
                                        </G>
                                    </G>

                                    {/* Mouth */}
                                    <G id="svga-group-mouth-single-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-mouth-single" transform="matrix(1,0,0,1,0,0)">
                                            <Path id="SvgjsPath3090" d="M86.9 128.6s2-.5 3.7-2.3c1.8-1.8 2.3-2.2 3.2-2.6 1-.4 3.2-1 4.9.4 1.6 1.3 2 .5 2.7 0s2-1.4 4.2-.6 4.3 3.4 5.6 4.1 2.2.9 2.2.9-1.7 2.4-3.1 3.8c-1.9 2-4.3 2.7-8.6 3-4.3.3-7.2-.5-9-1.7-1.9-1.2-3.5-3.2-3.9-3.6-.5-.5-1.9-1.4-1.9-1.4z" data-colored="true" data-fillType="tone" data-strokeType="none" fill="#da7c87" strokeWidth="1" opacity="1" transform="translate(0 3)" />
                                            <Path id="SvgjsPath3091" d="M86.2 128.6c1.8.9 3.6.8 5.5.4 1.4-.3 2.9-.6 4.3-.5s2.7.8 4.2.9c1.1 0 2-.4 3-.7 1.9-.6 3.5-.3 5.4.1 1.9.4 4 1 5.7-.2.3-.2.1-.6-.2-.6-2.7.5-4.7-.2-7.4-.6-2.4-.4-4.4 1.1-6.8.8-2-.2-3.5-1-5.5-.7-2.7.3-5.2 1.4-7.9.4-.4 0-.6.6-.3.7z" data-colored="true" data-fillType="sd1" data-strokeType="none" fill="#cb5f6c" strokeWidth="1" opacity="1" transform="translate(0 3)" />
                                            <Path id="SvgjsPath3092" d="M109.8 130.3c-4.4.3-8.6 1.8-13 1.6-.2 0-.3.3-.1.4 4.3 1.1 9.6 1.4 13.2-1.8.1-.1 0-.2-.1-.2z" data-colored="true" data-fillType="hl1" data-strokeType="none" fill="#e99ca5" strokeWidth="1" opacity="1" transform="translate(0 3)" />
                                        </G>
                                    </G>

                                    {/* Left eye */}
                                    <G id="svga-group-eyes-left-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-eyes-left" transform="matrix(1,0,0,1,0,0)">
                                            {/* Left Eyesback */}
                                            <G id="svga-group-eyesback-left">
                                                {leftEyeBack.map((part, index) => (
                                                    <Path key={`eyesback-left-${index}`} d={part.path} fill="#fff" strokeWidth="1" opacity="1" data-colored="false" data-strokeType="none" />
                                                ))}
                                            </G>

                                            {/* Left Iris */}
                                            <G id="svga-group-eyesiriswrapper-left">
                                                <G id="svga-group-eyesiriscontrol-left">
                                                    <G id="svga-group-eyesiris-left">
                                                        {left.map((part, index) => (
                                                            <Path key={`iris-left-${index}`} d={part.path} fill={getIrisFillColor(part.fill)} strokeWidth="1" opacity="1" data-colored={part.fill === "tone" ? "true" : "false"} data-strokeType="none" />
                                                        ))}
                                                    </G>
                                                </G>
                                            </G>

                                            {/* Left Eyesfront */}
                                            <G id="svga-group-eyesfront-left">
                                                {leftEye.map((p, index) => (
                                                    <Path key={`left-${index}`} d={p.path} fill="#F3D4CF" strokeWidth="1" opacity="0.3" data-fillType={p.fill} data-colored="true" data-strokeType="none" />
                                                ))}
                                            </G>
                                        </G>
                                    </G>

                                    {/* Right eye */}
                                    <G id="svga-group-eyes-right-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-eyes-right" transform="matrix(1,0,0,1,0,0)">
                                            {/* Right Eyesback */}
                                            <G id="svga-group-eyesback-right">
                                                {rightEyeBack.map((part, index) => (
                                                    <Path key={`eyesback-right-${index}`} d={part.path} fill="#fff" strokeWidth="1" opacity="1" data-fillType={part.fill} data-colored="false" data-strokeType="none" />
                                                ))}
                                            </G>

                                            {/* Right Iris */}
                                            <G id="svga-group-eyesiriswrapper-right">
                                                <G id="svga-group-eyesiriscontrol-right">
                                                    <G id="svga-group-eyesiris-right">
                                                        {right.map((part, index) => (
                                                            <Path key={`iris-right-${index}`} d={part.path} fill={getIrisFillColor(part.fill)} strokeWidth="1" opacity="1" data-fillType={part.fill} data-colored={part.fill === "tone" ? "true" : "false"} data-strokeType="none" />
                                                        ))}
                                                    </G>
                                                </G>
                                            </G>

                                            {/* Right Eyesfront */}
                                            <G id="svga-group-eyesfront-right">
                                                {rightEye.map((p, index) => (
                                                    <Path key={`right-${index}`} d={p.path} fill="#F3D4CF" strokeWidth="1" opacity="0.3" data-fillType={p.fill} data-colored="true" data-strokeType="none" />
                                                ))}
                                            </G>
                                        </G>
                                    </G>

                                    {/* Face highlight */}
                                    <G id="svga-group-facehighlight-single" />

                                    {/* Left Eyebrow */}
                                    <G id="svga-group-eyebrows-left-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-eyebrows-left-rotate" transform="matrix(1,0,0,1,0,0)">
                                            <G id="svga-group-eyebrows-left" transform="matrix(1,0,0,1,0,0)">
                                                {rawEyebrowData[selectedEyebrowId]?.left.map((shape, index) => (
                                                    <Path
                                                        key={`left-eyebrow-${index}`}
                                                        d={shape.path}
                                                        fill="#000"
                                                        strokeWidth="1"
                                                        opacity="1"
                                                        data-fillType={shape.fill}
                                                        data-colored="true"
                                                        data-strokeType="none"
                                                    />
                                                ))}
                                            </G>
                                        </G>
                                    </G>

                                    {/* Right Eyebrow */}
                                    <G id="svga-group-eyebrows-right-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-eyebrows-right-rotate" transform="matrix(1,0,0,1,0,0)">
                                            <G id="svga-group-eyebrows-right" transform="matrix(1,0,0,1,0,0)">
                                                {rawEyebrowData[selectedEyebrowId]?.right.map((shape, index) => (
                                                    <Path
                                                        key={`right-eyebrow-${index}`}
                                                        d={shape.path}
                                                        fill="#000"
                                                        strokeWidth="1"
                                                        opacity="1"
                                                        data-fillType={shape.fill}
                                                        data-colored="true"
                                                        data-strokeType="none"
                                                    />
                                                ))}
                                            </G>
                                        </G>
                                    </G>

                                    {/* Nose */}
                                    <G id="svga-group-nose-single-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-nose-single" transform="matrix(1,0,0,1,0,0)">
                                            <Path id="SvgjsPath3247" d="M97.72 89.37c-.8 3.33-.91 6.89-1.27 10.29-.38 3.64-1.08 7.4-1.03 11.06 0 .29.45.37.52.07.74-3.34.83-6.91 1.18-10.31.37-3.64 1.05-7.41.93-11.06 0-.19-.28-.24-.33-.05z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1" transform="translate(0 2)" />
                                            <Path id="SvgjsPath3248" d="M94.71 108.8c-.98 1.31-1.8 2.73-2.52 4.2-.46.95-1.04 2.07-.73 3.16.5 1.8 2.79 2.36 4.28 1.51.44-.26.24-.95-.26-.95-.87-.01-1.89.27-2.58-.47-.84-.89-.01-2.5.36-3.4.55-1.32 1.22-2.59 1.74-3.92.07-.19-.19-.26-.29-.13z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1" transform="translate(0 2)" />
                                            <Path id="SvgjsPath3249" d="M94.57 116.21c2.7-.2 3.21 3.2 5.78 3.28 2.2.07 2.37-3.24 4.46-3.14.24.01.32-.33.12-.45-2.37-1.4-2.81 2.72-4.99 2.46-1.29-.15-2.21-2.05-3.37-2.6-.79-.37-1.36-.34-2.13.01-.19.11-.09.46.13.44z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1" transform="translate(0 2)" />
                                            <Path id="SvgjsPath3250" d="M104.07 117.75c1.78.4 3.85-.15 4.27-2.13.21-.99-.12-1.97-.64-2.81-.84-1.37-1.93-2.53-2.73-3.95-.13-.24-.47-.12-.48.13-.1 1.59 1.08 2.69 1.92 3.92.78 1.13 1.45 2.69.14 3.81-.6.51-1.74.42-2.48.56-.24.05-.23.42 0 .47z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1" transform="translate(0 2)" />
                                            <Path id="SvgjsPath3251" d="M102.32 112.41c-.39-.7-1.4-.81-1.96-.25-.05.05-.23.28-.28.34-.06.08-.19.25-.21.28-.06.1-.12.2-.17.3l-.11.26c0-.01-.01.01-.03.05-.06.06-.12.13-.17.19-.17.18-.34.36-.48.57-.4.63-.08 1.35.46 1.75.83.62 2.03.12 2.61-.58.7-.84.89-1.92.34-2.91z" data-colored="true" data-fillType="hl05" data-strokeType="none" fill="#fbe5e2" strokeWidth="1" opacity="1" transform="translate(0 2)" />
                                        </G>
                                    </G>

                                    {/* Hair */}
                                    <G id="svga-group-hair-front" transform="matrix(1,0,0,1,0,0)">

                                        <G id="svga-hair">
                                            {hairShapes[selectedHairId]?.front.map((hairPath, idx) => (
                                                <Path key={`hair-${idx}`} d={hairPath.path} fill={getFillColor(hairPath.fill)} stroke="none" strokeWidth={1} opacity={1} data-fillType={hairPath.fill} data-colored="true" />
                                            ))}
                                        </G>


                                        {/* <G id="svga-hair">
                                            <Path id="SvgjsPath3302" d="M75.1 60.2s9.5 11.9 24.4 14.5c14.9 2.6 28.5 2 33.7 9.5s4.4 23.6 4.4 23.6 5.9-14.5 6.3-20c.4-5.6 1-26.1-11.9-38.6s-43-21-59-2c0 0-11.3.4-16.8 18.8s5.5 42.8 5.5 42.8S60 92 65.2 83.2c6.7-11.5 8.7-14.3 9.9-23z" data-colored="true" data-fillType="tone" data-strokeType="none" fill="#000" strokeWidth="1" opacity="1" />
                                            <Path id="SvgjsPath3303" d="M137.2 84.7c-3.8-5.4-10.5-7.4-16.6-8.9-17.5-4.1-40.4-3.7-46.8-24.4-.1-.4-.7-.2-.6.2 2.4 13.9 17.5 19.9 29.6 22.4 14.5 3 41.7 5 35.7 26.9-.1.3.4.4.5.1 2.1-5.4 1.6-11.4-1.8-16.3zm-14-27.9c-6.1-3.4-12.9-5.5-19.9-6.2-9.4-1-18.8 1-27.6-3.5-.2-.1-.5.2-.2.4 4.9 2.8 10.4 3.3 16 3.4 7.8.1 15.2.2 22.6 2.7 13.9 4.7 26.3 15 27.2 30-3.8-10.2-14.3-14.9-24.2-17.8-13.7-4-31.1-4.4-41.7-15.1-.1-.1-.3 0-.2.2 7.3 9.2 20.1 10.2 30.8 12.8 13.3 3.2 29.4 6.7 35.1 20.7 0 .1.1.1.2.1 0 .9 0 1.9-.1 2.9 0 .3.4.3.5.1 3-13.4-7.8-24.8-18.5-30.7zM135 58c-13.2-18-38.6-22.3-58.2-13.4-.2.1 0 .5.2.4 10.4-4.8 22.2-6 33.3-2.8 9.9 2.8 17.5 8.7 24.4 16.1.2 0 .4-.1.3-.3zm-62.3-3.8c0-.2-.4-.3-.4 0 0 5.5-.4 10.8-2.4 15.9-1.6 4.2-4 7.9-6.1 11.8-3.2 6.1-5 12.3-4.1 19.2 0 .2.4.2.4-.1-.3-9.9 3.5-16.7 8-25.2 3.7-6.7 5.6-14 4.6-21.6zm-3.1-3.4C56.8 60 55.8 77.9 58.1 92.1c0 .2.3.1.3 0-1.5-15.3-.4-30 11.4-41 .1-.2-.1-.4-.2-.3zm-.1 6.7c-1.9 5.7-3.8 11.2-6.1 16.8-.1.2.2.3.3.1 2.7-5.2 5-11 6.1-16.8 0-.2-.3-.3-.3-.1z" data-colored="true" data-fillType="sd1" data-strokeType="none" fill="#1b141c" strokeWidth="1" opacity="1" />
                                            <Path id="SvgjsPath3304" d="M121.5 73.9c-6.8-3.4-14.7-2.8-21.9-5.1-8.6-2.7-15.5-7.6-22.2-13.4-.2-.1-.4.1-.2.2 4.9 5.6 11.6 9.8 18.5 12.6 8.3 3.3 17.6 2.6 25.8 6 0 0 .1-.2 0-.3zm9.7.4c-10.4-8.1-25.3-7.2-37.7-9.8-.2 0-.2.2-.1.2 12.6 4.1 25.8 2.6 37.6 9.8.2.1.4-.1.2-.2zm-22.4-16c-10.8-.3-20-2.9-29.6-7.8-.2-.1-.4.2-.2.3 8.6 5.8 19.4 8.6 29.8 8 .4 0 .4-.5 0-.5zm15.5 5.4c-6-5.6-14-7.2-21.9-8.3-.1 0-.2.2 0 .2 7.7 1.8 15.2 3.3 21.6 8.3.3.2.5 0 .3-.2zm-4-10.8c-9.8-5.9-22.9-6.6-34.1-7.1-.2 0-.3.3-.1.4 11.6 1.9 23.1 2 33.9 7.1.3 0 .5-.3.3-.4zm-3.7-4c-6.9-4.2-15.1-6.3-23.2-5.8-.3 0-.3.4 0 .5 8.2.4 15.5 2.2 22.9 5.8.3 0 .5-.4.3-.5zm-48.9 7c-4.2 4.5-6.9 10.4-7.3 16.6 0 .2.3.2.3 0 1-6.2 3.2-11.5 7.2-16.4.1-.1-.1-.3-.2-.2zm2.3-2c-1.2 3.1-2.7 6.2-4.3 9.1-.1.1.1.2.2.1 2.1-2.8 3.5-5.8 4.4-9.2-.1-.1-.3-.1-.3 0zm.2 5.7c-1.2 5-2.5 9.6-5 14.2-1.8 3.4-3.6 6.5-4.4 10.3 0 .1.2.2.2.1 1.4-4.7 4.1-8.5 6.2-12.9 1.8-3.7 2.6-7.5 3.3-11.5 0-.3-.3-.4-.3-.2z" data-colored="true" data-fillType="hl1" data-strokeType="none" fill="#3a353a" strokeWidth="1" opacity="1" />
                                        </G> */}

                                        {/* Beard */}
                                        <G id="svga-beard">
                                            {currentBeardPaths.map((beardPath, idx) => (
                                                <Path key={idx} d={beardPath.path} fill="#000000" strokeWidth="1" opacity="1" />
                                            ))}
                                        </G>
                                    </G>

                                    {/* Glasses */}
                                    <G id="svga-group-glasses-single-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-glasses-single" transform="matrix(1,0,0,1,0,0)" />
                                    </G>
                                </G>
                            </G>
                        </G>
                    </G>
                </Svg>
            </View>

            <ScrollView contentContainerStyle={{ marginTop: 10, padding: 10, borderWidth: 2, borderBlockColor: "#fafafa" }}>

                {/* 📌 Beard */}
                <Text style={[styles.buttonHeadText]}>Beard</Text>
                <View style={[styles.buttonViewOne]}>
                    {beardShapeIds.map((id) => (
                        <View key={id} style={{ margin: 5, width: 90 }}>
                            <Button title={`Beard ${id}`} onPress={() => setSelectedBeardId(id)} />
                        </View>
                    ))}
                </View>

                {/* 📌 Ears */}
                <Text style={[styles.buttonHeadText]}>Ears</Text>
                <View style={[styles.buttonViewOne]}>
                    {earIds.map((id) => (
                        <View key={id} style={{ margin: 5, width: 90 }}>
                            <Button title={`Ear ${id}`} onPress={() => setSelectedEarId(id)} />
                        </View>
                    ))}
                </View>

                {/* 📌 Eye brows */}
                <Text style={[styles.buttonHeadText]}>Eyebrows</Text>
                <View style={[styles.buttonViewOne]}>
                    {eyebrowsIds.map((_, index) => (
                        <View key={index} style={{ margin: 5, width: 90 }}>
                            <Button
                                key={`EyeB-${index}`}
                                title={`EyeB ${index}`}
                                onPress={() => setSelectedEyebrowId(index)}
                            />
                        </View>
                    ))}
                </View>

                {/* 📌 Clothes */}
                <Text style={[styles.buttonHeadText]}>Clothes</Text>
                <View style={[styles.buttonViewOne]}>
                    {clothesShapeIds.map((id) => (
                        <View key={id} style={{ margin: 5, width: 90 }}>
                            <Button
                                title={`Dress ${id}`}
                                onPress={() => setCurrentClothesId(id)} />
                        </View>
                    ))}
                </View>

                {/* 📌 Eyesfront */}
                <Text style={[styles.buttonHeadText]}>Eyes Front</Text>
                <View style={[styles.buttonViewOne]}>
                    {eyesFrontShapeIds.map((id) => (
                        <View key={id} style={{ margin: 5, width: 90 }}>
                            <Button title={"EyeF " + id} onPress={() => setCurrentEyesId(id)} />
                        </View>
                    ))}
                </View>

                {/* 📌 Eyesback */}
                <Text style={styles.buttonHeadText}>Eyes Back</Text>
                <View style={styles.buttonViewOne}>
                    {eyesBackShapeIds.map((id) => (
                        <View key={id} style={{ margin: 5, width: 90 }}>
                            <Button title={`EyeB ${id}`} onPress={() => setSelectedEyeBackId(id)} />
                        </View>
                    ))}
                </View>

                {/* 📌 Iris */}
                <Text style={styles.buttonHeadText}>Iris</Text>
                <View style={styles.buttonViewOne}>
                    {irisShapeIds.map((id) => (
                        <View key={id} style={{ margin: 5, width: 90 }}>
                            <Button title={`Iris ${id}`} onPress={() => setSelectedIrisId(id)} />
                        </View>
                    ))}
                </View>

                {/* 📌 FaceShape */}
                <Text style={[styles.buttonHeadText]}>Face Shape</Text>
                <View style={[styles.buttonViewOne]}>
                    {Object.keys(faceShapes).map((id) => (
                        <View key={id} style={{ margin: 5, width: 100 }}>
                            <Button
                                title={`Face ${id}`}
                                onPress={() => setSelectedFaceShapeId(id)}
                            />
                        </View>
                    ))}
                </View>

                {/* 📌 Hair */}
                <Text style={styles.buttonHeadText}>Hair</Text>
                <View style={styles.buttonViewOne}>
                    {Object.keys(hairShapes).map((id) => (
                        <View key={id} style={{ margin: 5, width: 100 }}>
                            <Button
                                title={`Hair ${id}`}
                                onPress={() => setSelectedHairId(id)}
                            />
                        </View>
                    ))}
                </View>

            </ScrollView >
        </>
    );
};

export default AvatarCustomization;

const styles = StyleSheet.create({
    buttonHeadText: {
        fontSize: 20,
        width: "100%",
        color: "#fff",
        textAlign: "center",
        marginTop: 5,
        marginBottom: 5
    },
    buttonViewOne: {
        width: "100%",
        height: "auto",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 20
    }
});
