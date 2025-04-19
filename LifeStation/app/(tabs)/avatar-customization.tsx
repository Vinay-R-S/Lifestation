import React, { useState } from "react";
import { View, Button, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
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


// 📌 Nose *******************************************************************************************************
type NoseShape = { path: string; fill: string };
type NoseShapes = { [key: string]: NoseShape[] };

const noseRawShapes = elementsInfo.nose.shapes;
const noseShapes: NoseShapes = noseRawShapes.reduce((acc, shapeObj, index) => {
    acc[(index + 1).toString()] = shapeObj.single;
    return acc;
}, {} as NoseShapes);

const noseShapeIds = Object.keys(noseShapes);



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

    // 📌 Nose ****************************************************************************************************
    const [selectedNoseId, setSelectedNoseId] = useState(noseShapeIds[0]);
    const currentNosePaths = noseShapes[selectedNoseId];



    return (
        <>
            <View style={{ "width": "100%", "marginTop": 12, "marginBottom": 16, "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                <Svg width="200" height="200" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet">
                    {/* <Defs /> */}
                    <G id="svga-group-wrapper">
                        {/* Background */}
                        <G id="svga-group-backs-single">
                            <Path id="SvgjsPath3085" d="M0 0h200v200H0V0z" data-colored="true" data-filltype="tone" fill="#333" strokeWidth="1" opacity="1" />
                        </G>

                        {/* Human Body */}
                        <G id="svga-group-humanwrap-move" transform="matrix(1,0,0,1,0,0)">
                            <G id="svga-group-humanwrap" transform="matrix(1,0,0,1,0,0)">
                                {/* Human Body */}
                                <G id="svga-group-humanbody-back">
                                    <Path id="SvgjsPath3152" d="m168.5 219.5-1.7-21.5s.7-9-8.8-15.3-23.4-10.1-29.5-14.2c-6.1-4.1-9.2-4.5-9-16.9s.9-40.3.9-40.3H79.6s.7 27.9.9 40.3c.2 12.4-2.9 12.8-9 16.9-6.1 4.1-20 7.9-29.5 14.2S33.2 198 33.2 198l-1.6 21.5h136.9z" data-colored="true" data-filltype="tone" fill="#f3d4cf" strokeWidth="1" opacity="1" />
                                </G>

                                {/* Humanbody */}
                                <G id="svga-group-humanbody-front">
                                    <Path id="SvgjsPath3153" d="M73.8 175.9c5.1 2.9 11.8 5.2 17.6 5.7.4 0 .4-.6.1-.7-2.8-1.1-5.9-1.7-8.8-2.6-2.9-.9-5.8-2-8.8-2.7-.1-.1-.3.2-.1.3zm35.2 6.2c5.3-.6 11.3-3 15.9-5.8.3-.2.1-.6-.2-.5-2.6.9-5.2 2-7.8 2.9-2.6.9-5.4 1.5-8 2.5-.5.1-.5.9.1.9z" data-colored="true" data-filltype="sd2" fill="#d4958a" strokeWidth="1" opacity="1" />
                                    <Path id="SvgjsPath3154" d="m168.4 219.4-2.1-21.4c0-2.2-.5-4.5-1.5-6.6-.9-2.1-2.3-3.9-3.9-5.5s-3.5-2.8-5.5-4c-2-1.2-4.1-2.2-6.2-3.1-4.2-1.9-8.6-3.6-12.9-5.4-2.2-.9-4.3-1.9-6.4-3-1.1-.6-2.1-1.2-3-1.9-1-.6-2-1.2-3-1.9s-2-1.5-2.8-2.6c-.8-1-1.3-2.2-1.7-3.4-.7-2.4-.8-4.8-.8-7.2 0-4.7.2-9.4.3-14.1.2-9.4.6-18.7.9-28l.6.6-20.4-.2-20.4-.1.3-.3.7 28c.1 4.7.3 9.3.4 14 0 2.4-.1 4.7-.8 7.1-.3 1.2-.9 2.3-1.6 3.3-.8 1-1.7 1.8-2.7 2.5s-2 1.3-2.9 2c-.9.6-1.9 1.3-3 1.9-2.1 1.2-4.2 2.1-6.4 3.1-4.3 1.9-8.6 3.6-12.8 5.6-2.1 1-4.2 2.1-6.1 3.2-2 1.2-3.8 2.4-5.4 4-1.6 1.6-2.9 3.4-3.8 5.4-.4 1-.8 2.1-1 3.1-.2 1.1-.4 2.2-.3 3.2v.2l-1.5 21.5-1-1.1 34 .1c11.3 0 22.7.1 34.1.2l34.2.3 34.4.5zm.2.2-34 .4-34.2.3c-11.4.1-22.9.2-34.4.2l-34.4.1h-1.1l.1-1.1 1.7-21.5v.1c-.1-5.1 2.2-9.8 5.7-13.3 1.7-1.7 3.8-3.1 5.8-4.3 2-1.2 4.2-2.2 6.3-3.2 4.3-2 8.7-3.7 13-5.4 2.1-.9 4.3-1.8 6.3-2.9 1-.5 1.9-1.1 3-1.8 1-.6 2-1.2 2.9-1.9.9-.6 1.8-1.4 2.4-2.2.7-.9 1.2-1.9 1.5-2.9.6-2.1.8-4.5.8-6.8 0-4.6-.1-9.3-.2-14l-.6-28v-.3h.3l20.4-.1 20.4-.2h.6v.6c-.1 9.3-.2 18.7-.4 28-.1 4.7-.2 9.4-.2 14 .1 2.3.2 4.6.8 6.7.3 1.1.8 2 1.4 2.9.6.8 1.4 1.6 2.4 2.2.9.6 1.9 1.3 2.9 1.9 1 .7 1.9 1.3 2.9 1.8 2 1.1 4.1 2.1 6.3 3 4.3 1.8 8.6 3.6 12.9 5.6 2.1 1 4.2 2.1 6.2 3.3 2 1.2 4 2.6 5.7 4.3 3.4 3.4 5.6 8.1 5.4 13v-.1l1.4 21.6zm-112.8-.4 1.9-13.8.1 13.8h-2zm88.6 0-1.9-13.8-.1 13.8h2z" data-colored="true" data-filltype="sd3" fill="#c5796d" strokeWidth="1" opacity="1" />
                                </G>

                                {/* Clothes */}
                                <G id="svga-group-clothes-single">
                                    {currentPaths.map((pathObj, index) => (
                                        <Path key={index} d={pathObj.path} fill="#900000" strokeWidth="1" opacity="1" data-filltype={pathObj.fill} data-colored="true" />
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
                                                    data-filltype={shape.fill}
                                                    data-colored="true"

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
                                                    data-filltype={shape.fill}
                                                    data-colored="true"

                                                />
                                            ))}
                                        </G>
                                    </G>

                                    {/* Face shape */}
                                    <G id="svga-group-faceshape-wrap" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-faceshape-single">
                                            {faceShapes[selectedFaceShapeId]?.faceShapeSingle.map((pathObj, idx) => (
                                                <Path key={`face-shape-${idx}`} d={pathObj.path} fill={getFillColor(pathObj.fill)} stroke="none" strokeWidth={1} opacity={1} data-filltype={pathObj.fill} data-colored="true" />
                                            ))}
                                        </G>
                                    </G>

                                    {/* Mouth */}
                                    <G id="svga-group-mouth-single-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-mouth-single" transform="matrix(1,0,0,1,0,0)">
                                            <Path id="SvgjsPath3090" d="M86.9 128.6s2-.5 3.7-2.3c1.8-1.8 2.3-2.2 3.2-2.6 1-.4 3.2-1 4.9.4 1.6 1.3 2 .5 2.7 0s2-1.4 4.2-.6 4.3 3.4 5.6 4.1 2.2.9 2.2.9-1.7 2.4-3.1 3.8c-1.9 2-4.3 2.7-8.6 3-4.3.3-7.2-.5-9-1.7-1.9-1.2-3.5-3.2-3.9-3.6-.5-.5-1.9-1.4-1.9-1.4z" data-colored="true" data-filltype="tone" fill="#da7c87" strokeWidth="1" opacity="1" transform="translate(0 3)" />
                                            <Path id="SvgjsPath3091" d="M86.2 128.6c1.8.9 3.6.8 5.5.4 1.4-.3 2.9-.6 4.3-.5s2.7.8 4.2.9c1.1 0 2-.4 3-.7 1.9-.6 3.5-.3 5.4.1 1.9.4 4 1 5.7-.2.3-.2.1-.6-.2-.6-2.7.5-4.7-.2-7.4-.6-2.4-.4-4.4 1.1-6.8.8-2-.2-3.5-1-5.5-.7-2.7.3-5.2 1.4-7.9.4-.4 0-.6.6-.3.7z" data-colored="true" data-filltype="sd1" fill="#cb5f6c" strokeWidth="1" opacity="1" transform="translate(0 3)" />
                                            <Path id="SvgjsPath3092" d="M109.8 130.3c-4.4.3-8.6 1.8-13 1.6-.2 0-.3.3-.1.4 4.3 1.1 9.6 1.4 13.2-1.8.1-.1 0-.2-.1-.2z" data-colored="true" data-filltype="hl1" fill="#e99ca5" strokeWidth="1" opacity="1" transform="translate(0 3)" />
                                        </G>
                                    </G>

                                    {/* Left eye */}
                                    <G id="svga-group-eyes-left-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-eyes-left" transform="matrix(1,0,0,1,0,0)">
                                            {/* Left Eyesback */}
                                            <G id="svga-group-eyesback-left">
                                                {leftEyeBack.map((part, index) => (
                                                    <Path key={`eyesback-left-${index}`} d={part.path} fill="#fff" strokeWidth="1" opacity="1" data-colored="false" />
                                                ))}
                                            </G>

                                            {/* Left Iris */}
                                            <G id="svga-group-eyesiriswrapper-left">
                                                <G id="svga-group-eyesiriscontrol-left">
                                                    <G id="svga-group-eyesiris-left">
                                                        {left.map((part, index) => (
                                                            <Path key={`iris-left-${index}`} d={part.path} fill={getIrisFillColor(part.fill)} strokeWidth="1" opacity="1" data-colored={part.fill === "tone" ? "true" : "false"} />
                                                        ))}
                                                    </G>
                                                </G>
                                            </G>
                                        </G>
                                    </G>

                                    {/* Right eye */}
                                    <G id="svga-group-eyes-right-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-eyes-right" transform="matrix(1,0,0,1,0,0)">
                                            {/* Right Eyesback */}
                                            <G id="svga-group-eyesback-right">
                                                {rightEyeBack.map((part, index) => (
                                                    <Path key={`eyesback-right-${index}`} d={part.path} fill="#fff" strokeWidth="1" opacity="1" data-filltype={part.fill} data-colored="false" />
                                                ))}
                                            </G>

                                            {/* Right Iris */}
                                            <G id="svga-group-eyesiriswrapper-right">
                                                <G id="svga-group-eyesiriscontrol-right">
                                                    <G id="svga-group-eyesiris-right">
                                                        {right.map((part, index) => (
                                                            <Path key={`iris-right-${index}`} d={part.path} fill={getIrisFillColor(part.fill)} strokeWidth="1" opacity="1" data-filltype={part.fill} data-colored={part.fill === "tone" ? "true" : "false"} />
                                                        ))}
                                                    </G>
                                                </G>
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
                                                        data-filltype={shape.fill}
                                                        data-colored="true"

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
                                                        data-filltype={shape.fill}
                                                        data-colored="true"

                                                    />
                                                ))}
                                            </G>
                                        </G>
                                    </G>

                                    {/* Nose */}
                                    <G id="svga-group-nose-single-move" transform="matrix(1,0,0,1,0,0)">
                                        <G id="svga-group-nose-single" transform="matrix(1,0,0,1,0,0)">
                                            {currentNosePaths.map((part, index) => (
                                                <Path
                                                    key={`nose-path-${index}`}
                                                    d={part.path}
                                                    fill={part.fill === "tone" ? "#F3D4CF" : part.fill} // optional dynamic color
                                                    strokeWidth="1"
                                                    opacity="1"
                                                    data-colored="true"
                                                    data-filltype={part.fill}
                                                    transform="translate(0 2)"
                                                />
                                            ))}
                                        </G>
                                    </G>

                                    {/* Hair */}
                                    <G id="svga-group-hair-front" transform="matrix(1,0,0,1,0,0)">

                                        <G id="svga-hair">
                                            {hairShapes[selectedHairId]?.front.map((hairPath, idx) => (
                                                <Path key={`hair-${idx}`} d={hairPath.path} fill={getFillColor(hairPath.fill)} stroke="none" strokeWidth={1} opacity={1} data-filltype={hairPath.fill} data-colored="true" />
                                            ))}
                                        </G>

                                        {/* Beard */}
                                        <G id="svga-beard">
                                            {currentBeardPaths.map((beardPath, idx) => (
                                                <Path key={idx} d={beardPath.path} fill="#000000" strokeWidth="1" opacity="1" />
                                            ))}
                                        </G>
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
                    {beardShapeIds.map((id) => {
                        const paths = beardShapesRaw[id] || [];

                        return (
                            <View key={id} style={{ margin: 5, width: 90 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedBeardId(id);
                                    }}
                                    style={[
                                        styles.innerSVG,
                                        selectedBeardId === id && { borderColor: "yellow", borderWidth: 2 }, // Optional highlight
                                    ]}>
                                    <Svg width={60} height={60} viewBox="0 10 200 200">
                                        <G id="svga-beard">
                                            {paths.map((beardPath, idx) => (
                                                <Path
                                                    key={idx}
                                                    d={beardPath.path}
                                                    fill={beardPath.fill || "#000"}
                                                    stroke="#000"
                                                    strokeWidth="1"
                                                    opacity="1"
                                                />
                                            ))}
                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                {/* 📌 Ears */}
                <Text style={[styles.buttonHeadText]}>Ears</Text>
                <View style={[styles.buttonViewOne]}>
                    {earIds.map((id) => {
                        const earData = rawEarsData[id];

                        return (
                            <View key={id} style={{ margin: 5, width: 90 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedEarId(id);
                                    }}
                                    style={[
                                        styles.innerSVG,
                                        selectedEarId === id && { borderColor: "yellow", borderWidth: 2 } // Optional highlight
                                    ]}>
                                    <Svg width={100} height={60} viewBox="20 20 130 130">
                                        {/* Left Ear */}
                                        <G id="svga-group-ears-left" transform="matrix(1,0,0,1,0,0)">
                                            {earData.left.map((shape, idx) => (
                                                <Path
                                                    key={`left-ear-${idx}`}
                                                    d={shape.path}
                                                    fill="#F3D4CF"
                                                    stroke="#000"
                                                    strokeWidth="1"
                                                    opacity="1"
                                                />
                                            ))}
                                        </G>
                                        {/* Right Ear */}
                                        <G id="svga-group-ears-right" transform="matrix(1,0,0,1,0,0)">
                                            {earData.right.map((shape, idx) => (
                                                <Path
                                                    key={`right-ear-${idx}`}
                                                    d={shape.path}
                                                    fill="#F3D4CF"
                                                    stroke="#000"
                                                    strokeWidth="1"
                                                    opacity="1"
                                                />
                                            ))}
                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                {/* 📌 Eye brows */}
                <Text style={[styles.buttonHeadText]}>Eyebrows</Text>
                <View style={[styles.buttonViewOne]}>
                    {eyebrowsIds.map((_, id) => {
                        const eyebrowData = rawEyebrowData[id];

                        return (
                            <View key={id} style={{ margin: 5, width: 90 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedEyebrowId(id);
                                    }}
                                    style={[
                                        styles.innerSVG,
                                        selectedEyebrowId === id && { borderColor: "yellow", borderWidth: 2 } // Optional active border
                                    ]}>
                                    <Svg width={60} height={60} viewBox="40 20 120 100">
                                        {/* Left Eyebrow */}
                                        <G id="svga-group-eyebrows-left">
                                            {eyebrowData.left.map((shape, index) => (
                                                <Path
                                                    key={`eyebrow-left-${index}`}
                                                    d={shape.path}
                                                    fill={shape.fill || "#000"}
                                                    stroke="#000"
                                                    strokeWidth="1"
                                                    opacity="1"
                                                />
                                            ))}
                                        </G>

                                        {/* Right Eyebrow */}
                                        <G id="svga-group-eyebrows-right">
                                            {eyebrowData.right.map((shape, index) => (
                                                <Path
                                                    key={`eyebrow-right-${index}`}
                                                    d={shape.path}
                                                    fill={shape.fill || "#000"}
                                                    stroke="#000"
                                                    strokeWidth="1"
                                                    opacity="1"
                                                />
                                            ))}
                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                {/* 📌 Clothes */}
                <Text style={[styles.buttonHeadText]}>Clothes</Text>
                <View style={[styles.buttonViewOne]}>
                    {clothesShapeIds.map((id) => {
                        const paths = clothesShapesRaw[id]; // ✅ get SVG path array for this ID

                        return (
                            <View key={id} style={{ margin: 5, width: 90 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setCurrentClothesId(id);
                                    }}
                                    style={[
                                        styles.innerSVG,
                                        currentClothesId === id && { borderColor: "yellow", borderWidth: 2 } // Optional active border
                                    ]}>

                                    <Svg width={60} height={60} viewBox="0 50 200 220">
                                        <G id="svga-group-clothes-single">
                                            {paths.map((pathObj, index) => (
                                                <Path
                                                    key={index}
                                                    d={pathObj.path}
                                                    fill={pathObj.fill}
                                                    strokeWidth="1"
                                                    opacity="1"
                                                    data-filltype={pathObj.fill}
                                                    data-colored="true"
                                                />
                                            ))}
                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                {/* 📌 Eyesback */}
                <Text style={[styles.buttonHeadText]}>Eyes Back</Text>
                <View style={styles.buttonViewOne}>
                    {eyesBackShapeIds.map((id) => {
                        const { leftEyeBack, rightEyeBack } = eyesBackShapes[id];

                        return (
                            <View key={id} style={{ margin: 5, width: 90 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedEyeBackId(id);
                                    }}
                                    style={[
                                        styles.innerSVG,
                                        selectedEyeBackId === id && { borderColor: "yellow", borderWidth: 2 }
                                    ]}>
                                    <Svg width={60} height={60} viewBox="60 50 80 80">
                                        <G id={`eyesback-preview-${id}`}>
                                            {leftEyeBack.map((part, index) => (
                                                <Path
                                                    key={`leftEyeBack-${index}`}
                                                    d={part.path}
                                                    fill="#fff"
                                                    strokeWidth="1"
                                                    opacity="1"
                                                    data-filltype={part.fill}
                                                    data-colored="false"
                                                />
                                            ))}
                                            {rightEyeBack.map((part, index) => (
                                                <Path
                                                    key={`rightEyeBack-${index}`}
                                                    d={part.path}
                                                    fill="#fff"
                                                    strokeWidth="1"
                                                    opacity="1"
                                                    data-filltype={part.fill}
                                                    data-colored="false"
                                                />
                                            ))}
                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                {/* 📌 Iris */}
                <Text style={styles.buttonHeadText}>Iris</Text>
                <View style={styles.buttonViewOne}>
                    {irisShapeIds.map((id) => {
                        const { left, right } = irisShapes[id];

                        return (
                            <View key={id} style={{ margin: 5, width: 90 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedIrisId(id);
                                    }}
                                    style={[
                                        styles.innerSVG,
                                        selectedIrisId === id && { borderColor: "yellow", borderWidth: 2 }
                                    ]}
                                >
                                    <Svg width={60} height={60} viewBox="70 60 60 60">
                                        <G id={`iris-preview-${id}`}>
                                            {/* Left Iris */}
                                            {left.map((part, index) => (
                                                <Path
                                                    key={`left-${index}`}
                                                    d={part.path}
                                                    fill={getIrisFillColor(part.fill)}
                                                    strokeWidth="1"
                                                    opacity="1"
                                                    data-filltype={part.fill}
                                                    data-colored={part.fill === "tone" ? "true" : "false"}
                                                />
                                            ))}
                                            {/* Right Iris */}
                                            {right.map((part, index) => (
                                                <Path
                                                    key={`right-${index}`}
                                                    d={part.path}
                                                    fill={getIrisFillColor(part.fill)}
                                                    strokeWidth="1"
                                                    opacity="1"
                                                    data-filltype={part.fill}
                                                    data-colored={part.fill === "tone" ? "true" : "false"}
                                                />
                                            ))}
                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                {/* 📌 FaceShape */}
                <Text style={[styles.buttonHeadText]}>Face Shape</Text>
                <View style={[styles.buttonViewOne]}>
                    {faceShapeIds.map((id) => {
                        const shapeData = faceShapes[id].faceShapeSingle;

                        return (
                            <View key={id} style={{ margin: 5, width: 100 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedFaceShapeId(id);
                                    }}
                                    style={[
                                        styles.innerSVG,
                                        selectedFaceShapeId === id && { borderColor: "yellow", borderWidth: 2 }
                                    ]}
                                >
                                    <Svg width={60} height={60} viewBox="0 0 180 160">
                                        <G id={`face-preview-${id}`}>
                                            {shapeData.map((pathObj, idx) => (
                                                <Path
                                                    key={`face-${id}-${idx}`}
                                                    d={pathObj.path}
                                                    fill="#F3D4CF"
                                                    stroke="none"
                                                    strokeWidth={1}
                                                    opacity={1}
                                                    data-filltype="#F3D4CF"
                                                    data-colored="true"
                                                />
                                            ))}
                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                {/* 📌 Hair */}
                <Text style={[styles.buttonHeadText]}>Hair</Text>
                <View style={[styles.buttonViewOne]}>
                    {Object.keys(hairShapes).map((id) => {
                        const hairData = hairShapes[id];

                        return (
                            <View key={id} style={{ margin: 5, width: 100 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedHairId(id);
                                    }}
                                    style={[
                                        styles.innerSVG,
                                        selectedHairId === id && { borderColor: "yellow", borderWidth: 2 } // Optional highlight
                                    ]}>
                                    <Svg width={60} height={60} viewBox="0 10 180 120">
                                        <G id={`hair-preview-${id}`}>
                                            {hairData.front.map((hairPath, idx) => (
                                                <Path
                                                    key={`hair-${id}-${idx}`}
                                                    d={hairPath.path}
                                                    fill={getFillColor(hairPath.fill)}
                                                    stroke="none"
                                                    strokeWidth={1}
                                                    opacity={1}
                                                    data-filltype={hairPath.fill}
                                                    data-colored="true"
                                                />
                                            ))}
                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                
                {/* 📌 Nose */}
                <Text style={[styles.buttonHeadText]}>Nose</Text>
                <View style={[styles.buttonViewOne]}>
                    {noseShapeIds.map((id) => {
                        const paths = noseShapes[id];

                        return (
                            <View key={id} style={{ margin: 5, width: 90 }}>
                                <TouchableOpacity
                                    onPress={() => setSelectedNoseId(id)}
                                    style={[
                                        styles.innerSVG,
                                        selectedNoseId === id && { borderColor: "yellow", borderWidth: 2 },
                                    ]}
                                >
                                    <Svg width={60} height={60} viewBox="50 50 100 100">
                                        <G id="svga-group-nose-preview">
                                            {paths.map((part, index) => (
                                                <Path
                                                    key={`nose-preview-${index}`}
                                                    d={part.path}
                                                    fill={part.fill === "tone" ? "#F3D4CF" : part.fill}
                                                    strokeWidth="1"
                                                    opacity="1"
                                                />
                                            ))}
                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
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
    },
    innerSVG: {
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "#888",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});
