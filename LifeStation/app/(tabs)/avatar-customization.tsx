import React, { useState, useEffect } from "react";
import { View, Button, ScrollView, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import elementsData from "../../data/jsons/male.json";
import { Colors, TextStyles } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useGameState } from '../../context/GameStateContext';

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

type SelectedItems = {
    hair: string;
    eyes: string;
    mouth: string;
    nose: string;
    clothes: string;
};

type UnlockedItems = {
    hair: string[];
    eyes: string[];
    mouth: string[];
    nose: string[];
    clothes: string[];
    beard: string[];
    ears: string[];
    eyebrows: string[];
};

type ItemToUnlock = {
    id: string;
    category: string;
    cost: number;
};

const AvatarCustomization = () => {
    const { state, addCoins } = useGameState();
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({
        hair: 'hair1',
        eyes: 'eyes1',
        mouth: 'mouth1',
        nose: 'nose1',
        clothes: 'clothes1',
    });
    const [unlockedItems, setUnlockedItems] = useState<UnlockedItems>({
        hair: ['hair1'],
        eyes: ['eyes1'],
        mouth: ['mouth1'],
        nose: ['nose1'],
        clothes: ['clothes1'],
        beard: ['beard1'],
        ears: ['ears1'],
        eyebrows: ['eyebrows1'],
    });
    const [showUnlockModal, setShowUnlockModal] = useState(false);
    const [selectedItemToUnlock, setSelectedItemToUnlock] = useState<ItemToUnlock | null>(null);

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

    const handleUnlockItem = (category: keyof UnlockedItems, itemId: string, cost: number) => {
        if (state.coins >= cost) {
            addCoins(-cost);
            setUnlockedItems(prev => ({
                ...prev,
                [category]: [...prev[category], itemId]
            }));
            setShowUnlockModal(false);
            setSelectedItemToUnlock(null);
        }
    };

    const isItemUnlocked = (category: keyof UnlockedItems, itemId: string) => {
        return unlockedItems[category].includes(itemId);
    };

    const renderUnlockModal = () => {
        if (!selectedItemToUnlock) return null;
        
        return (
            <Modal
                visible={showUnlockModal}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Unlock Item</Text>
                        {state.coins >= selectedItemToUnlock.cost ? (
                            <Text style={styles.modalText}>
                                Unlock this item for {selectedItemToUnlock.cost} coins?
                            </Text>
                        ) : (
                            <Text style={styles.modalwrongText}>
                                You don't have enough coins to unlock this item.
                            </Text>
                        )}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    handleUnlockItem(
                                        selectedItemToUnlock.category as keyof UnlockedItems,
                                        selectedItemToUnlock.id,
                                        selectedItemToUnlock.cost
                                    );
                                }}
                            >
                                <Text style={styles.modalButtonText}>Unlock</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setShowUnlockModal(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const renderItem = (item: any, category: string) => {
        const isUnlocked = isItemUnlocked(category as keyof UnlockedItems, item.id);
        const canAfford = state.coins >= item.cost;

        return (
            <TouchableOpacity
                key={item.id}
                style={[
                    styles.item,
                    selectedItems[category as keyof SelectedItems] === item.id && styles.selectedItem
                ]}
                onPress={() => {
                    if (!isUnlocked) {
                        setSelectedItemToUnlock({ id: item.id, category, cost: item.cost });
                        setShowUnlockModal(true);
                    } else {
                        handleItemSelect(item.id, category as keyof SelectedItems);
                    }
                }}
            >
                {!isUnlocked && (
                    <View style={styles.lockContainer}>
                        <Ionicons name="lock-closed" size={24} color={Colors.primary} />
                    </View>
                )}
                <Text style={styles.itemText}>{item.name}</Text>
                {!isUnlocked && (
                    <Text style={styles.costText}>{item.cost} coins</Text>
                )}
            </TouchableOpacity>
        );
    };

    const handleItemSelect = (itemId: string, category: keyof SelectedItems) => {
        setSelectedItems(prev => ({
            ...prev,
            [category]: itemId,
        }));
    };

    const renderBeardSection = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Beard</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {beardShapeIds.map((id) => (
                    <TouchableOpacity
                        key={id}
                        style={[
                            styles.itemButton,
                            !isItemUnlocked('beard', id) && styles.lockedItem
                        ]}
                        onPress={() => {
                            if (isItemUnlocked('beard', id)) {
                                setSelectedBeardId(id);
                            } else {
                                setSelectedItemToUnlock({
                                    category: 'beard',
                                    id,
                                    cost: 2
                                });
                                setShowUnlockModal(true);
                            }
                        }}
                    >
                        <View style={{ backgroundColor: '#888', padding: 5 }}>
                        <Svg width={90} height={90} viewBox="0 0 200 200">
                            <G id={`beard-preview-${id}`}>
                                {beardShapesRaw[id].map((beardPath, idx) => (
                                    <Path
                                        key={`beard-${id}-${idx}`}
                                        d={beardPath.path}
                                        fill="#000000"
                                        strokeWidth="1"
                                        opacity="1"
                                    />
                                ))}
                            </G>
                        </Svg>
                        </View>
                        {!isItemUnlocked('beard', id) && (
                            <View style={styles.lockOverlay}>
                                <Ionicons name="lock-closed" size={24} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderEarsSection = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Ears</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {earIds.map((id) => (
                    <TouchableOpacity
                        key={id}
                        style={[
                            styles.itemButton,
                            !isItemUnlocked('ears', `ears${id}`) && styles.lockedItem
                        ]}
                        onPress={() => {
                            if (isItemUnlocked('ears', `ears${id}`)) {
                                setSelectedEarId(id);
                            } else {
                                setSelectedItemToUnlock({
                                    category: 'ears',
                                    id: `ears${id}`,
                                    cost: 2
                                });
                                setShowUnlockModal(true);
                            }
                        }}
                    >
                        <View style={{ backgroundColor: '#888', padding: 5 }}>
                        <Svg width={90} height={90} viewBox="30 30 130 130">
                            <G id={`ears-preview-${id}`}>
                                {rawEarsData[id].left.map((shape, idx) => (
                                    <Path
                                        key={`left-ear-${idx}`}
                                        d={shape.path}
                                        fill="#F3D4CF"
                                        stroke="#000"
                                        strokeWidth="1"
                                        opacity="1"
                                    />
                                ))}
                                {rawEarsData[id].right.map((shape, idx) => (
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
                        </View>
                        {!isItemUnlocked('ears', `ears${id}`) && (
                            <View style={styles.lockOverlay}>
                                <Ionicons name="lock-closed" size={24} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderEyebrowsSection = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Eyebrows</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {eyebrowsIds.map((id) => (
                    <TouchableOpacity
                        key={id}
                        style={[
                            styles.itemButton,
                            !isItemUnlocked('eyebrows', `eyebrows${id}`) && styles.lockedItem
                        ]}
                        onPress={() => {
                            if (isItemUnlocked('eyebrows', `eyebrows${id}`)) {
                                setSelectedEyebrowId(id);
                            } else {
                                setSelectedItemToUnlock({
                                    category: 'eyebrows',
                                    id: `eyebrows${id}`,
                                    cost: 2
                                });
                                setShowUnlockModal(true);
                            }
                        }}
                    >
                        <View style={{ backgroundColor: '#888', padding: 5 }}>
                        <Svg width={60} height={60} viewBox="40 20 120 100">
                            <G id={`eyebrows-preview-${id}`}>
                                {rawEyebrowData[id].left.map((shape, index) => (
                                    <Path
                                        key={`eyebrow-left-${index}`}
                                        d={shape.path}
                                        fill="#000"
                                        stroke="#000"
                                        strokeWidth="1"
                                        opacity="1"
                                    />
                                ))}
                                {rawEyebrowData[id].right.map((shape, index) => (
                                    <Path
                                        key={`eyebrow-right-${index}`}
                                        d={shape.path}
                                        fill="#000"
                                        stroke="#000"
                                        strokeWidth="1"
                                        opacity="1"
                                    />
                                ))}
                            </G>
                        </Svg>
                        </View>
                        {!isItemUnlocked('eyebrows', `eyebrows${id}`) && (
                            <View style={styles.lockOverlay}>
                                <Ionicons name="lock-closed" size={24} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderHairSection = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Hair</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Object.keys(hairShapes).map((id) => (
                    <TouchableOpacity
                        key={id}
                        style={[
                            styles.itemButton,
                            !isItemUnlocked('hair', `hair${id}`) && styles.lockedItem
                        ]}
                        onPress={() => {
                            if (isItemUnlocked('hair', `hair${id}`)) {
                                setSelectedHairId(id);
                            } else {
                                setSelectedItemToUnlock({
                                    category: 'hair',
                                    id: `hair${id}`,
                                    cost: 2
                                });
                                setShowUnlockModal(true);
                            }
                        }}
                    >
                        <View style={{ backgroundColor: '#888', padding: 5 }}>
                            <Svg width={80} height={80} viewBox="0 0 200 200">
                                <G id={`hair-preview-${id}`}>
                                    {hairShapes[id]?.front.map((hairPath, idx) => (
                                        <Path
                                            key={`hair-${idx}`}
                                            d={hairPath.path}
                                            fill={getFillColor(hairPath.fill)}
                                            stroke="none"
                                            strokeWidth={1}
                                            opacity={1}
                                        />
                                    ))}
                                </G>
                            </Svg>
                        </View>
                        {!isItemUnlocked('hair', `hair${id}`) && (
                            <View style={styles.lockOverlay}>
                                <Ionicons name="lock-closed" size={24} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderEyesSection = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Eyes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {irisShapeIds.map((id) => (
                    <TouchableOpacity
                        key={id}
                        style={[
                            styles.itemButton,
                            !isItemUnlocked('eyes', `eyes${id}`) && styles.lockedItem
                        ]}
                        onPress={() => {
                            if (isItemUnlocked('eyes', `eyes${id}`)) {
                                setSelectedIrisId(id);
                            } else {
                                setSelectedItemToUnlock({
                                    category: 'eyes',
                                    id: `eyes${id}`,
                                    cost: 2
                                });
                                setShowUnlockModal(true);
                            }
                        }}
                    >
                        <View style={{ backgroundColor: '#888', padding: 5 }}>
                    
                        <Svg width={250} height={250} viewBox="0 0 200 200">
                            <G id={`eyes-preview-${id}`}>
                                {irisShapes[id].left.map((part, idx) => (
                                    <Path
                                        key={`left-eye-${idx}`}
                                        d={part.path}
                                        fill={getIrisFillColor(part.fill)}
                                        strokeWidth="1"
                                        opacity="1"
                                    />
                                ))}
                                {irisShapes[id].right.map((part, idx) => (
                                    <Path
                                        key={`right-eye-${idx}`}
                                        d={part.path}
                                        fill={getIrisFillColor(part.fill)}
                                        strokeWidth="1"
                                        opacity="1"
                                    />
                                ))}
                            </G>
                        </Svg>
                        </View>
                        {!isItemUnlocked('eyes', `eyes${id}`) && (
                            <View style={styles.lockOverlay}>
                                <Ionicons name="lock-closed" size={24} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderNoseSection = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Nose</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {noseShapeIds.map((id) => (
                    <TouchableOpacity
                        key={id}
                        style={[
                            styles.itemButton,
                            !isItemUnlocked('nose', `nose${id}`) && styles.lockedItem
                        ]}
                        onPress={() => {
                            if (isItemUnlocked('nose', `nose${id}`)) {
                                setSelectedNoseId(id);
                            } else {
                                setSelectedItemToUnlock({
                                    category: 'nose',
                                    id: `nose${id}`,
                                    cost: 2
                                });
                                setShowUnlockModal(true);
                            }
                        }}
                    >
                        <View style={{ backgroundColor: '#888', padding: 5 }}>
                        <Svg width={220} height={220} viewBox="0 0 200 200">
                            <G id={`nose-preview-${id}`}>
                                {noseShapes[id].map((part, idx) => (
                                    <Path
                                        key={`nose-path-${idx}`}
                                        d={part.path}
                                        fill={part.fill === "tone" ? "#F3D4CF" : part.fill}
                                        strokeWidth="1"
                                        opacity="1"
                                    />
                                ))}
                            </G>
                        </Svg>
                        </View>
                        {!isItemUnlocked('nose', `nose${id}`) && (
                            <View style={styles.lockOverlay}>
                                <Ionicons name="lock-closed" size={24} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderClothesSection = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Clothes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {clothesShapeIds.map((id) => (
                    <TouchableOpacity
                        key={id}
                        style={[
                            styles.itemButton,
                            !isItemUnlocked('clothes', `clothes${id}`) && styles.lockedItem
                        ]}
                        onPress={() => {
                            if (isItemUnlocked('clothes', `clothes${id}`)) {
                                setCurrentClothesId(id);
                            } else {
                                setSelectedItemToUnlock({
                                    category: 'clothes',
                                    id: `clothes${id}`,
                                    cost: 2
                                });
                                setShowUnlockModal(true);
                            }
                        }}
                    >
                        <View style={{ backgroundColor: '#888', padding: 5 }}>
                            <Svg width={80} height={70} viewBox="0 30 200 190">
                                <G id={`clothes-preview-${id}`}>
                                    {clothesShapesRaw[id].map((pathObj, idx) => (
                                        <Path
                                            key={`clothes-${idx}`}
                                            d={pathObj.path}
                                            fill={pathObj.fill}
                                            strokeWidth="1"
                                            opacity="1"
                                        />
                                    ))}
                                </G>
                            </Svg>
                        </View>
                        {!isItemUnlocked('clothes', `clothes${id}`) && (
                            <View style={styles.lockOverlay}>
                                <Ionicons name="lock-closed" size={24} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.coinContainer}>
                <Ionicons name="logo-bitcoin" size={24} color="gold" />
                <Text style={styles.coinText}>{state.coins}</Text>
            </View>

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
                {renderBeardSection()}
                {renderEarsSection()}
                {renderEyebrowsSection()}
                {renderHairSection()}
                {renderEyesSection()}
                {renderNoseSection()}
                {renderClothesSection()}
            </ScrollView>

            {renderUnlockModal()}
        </View>
    );
};

export default AvatarCustomization;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0D1A', // Apply dark theme background color here
    },
    content: {
        flex: 1,
    },
    text: {
        color: Colors.textPrimary, // Set text color from theme
        fontSize: 18,
        fontFamily: 'SpaceMono-Regular',
    },
    buttonHeadText: {
        fontSize: 20,
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
        color: Colors.textPrimary,
        textAlign: "center"
    },
    buttonViewOne: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    innerSVG: {
        borderWidth: 2,
        borderColor: Colors.textPrimary,
        backgroundColor: "#888",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    coinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.background,
    },
    coinText: {
        marginLeft: 5,
        fontSize: 18,
        color: 'gold',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.textPrimary,
    },
    itemButton: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 40,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    lockedItem: {
        opacity: 0.5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: Colors.background,
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.textPrimary,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        color: Colors.textPrimary,
    },
    modalwrongText: {
        fontSize: 16,
        marginBottom: 20,
        color: 'red',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    item: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: Colors.background,
        alignItems: 'center',
    },
    selectedItem: {
        backgroundColor: Colors.primary,
    },
    lockContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    itemText: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontFamily: 'Arial',
    },
    costText: {
        color: Colors.primary,
        fontSize: 14,
        fontFamily: 'Arial',
        marginTop: 5,
    },
    lockOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
