import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const chipVariant = {
    CONTAINED: 'contained',
    OUTLINED: 'outlined',
    STANDARD: 'standard',
};

const chipSize = {
    LARGE: 'large',
    MEDIUM: 'medium',
    SMALL: 'small',
};

const styles = (primaryColor, secondaryColor, variant) => StyleSheet.create({
    inputAndChipWrapper: {
        padding: 8,
        margin: 8,
    },
    inputContained: {
        backgroundColor: '#e0e0e0',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 4,
    },
    inputOutlined: {
        backgroundColor: 'transparent',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 4,
    },
    inputStandard: {
        backgroundColor: 'transparent',
        borderBottomColor: '#e0e0e0',
        borderWidth: 1,
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
    },
    input: {
        padding: 8,
        fontSize: 20,
    },
    chipWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
    },
    chipWrapperLarge: {
        height: 50,
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    chipWrapperMedium: {
        height: 40,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    chipWrapperSmall: {
        height: 35,
        borderRadius: 17.5,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    chipsContainer: {
        padding: 8,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chipContained: {
        backgroundColor: primaryColor ? primaryColor : '#e0e0e0',
        borderColor: 'transparent',
        borderWidth: 1,
    },
    chipOutlined: {
        backgroundColor: 'white',
        borderColor: primaryColor ? primaryColor : '#bdbdbd',
        borderWidth: 1,
    },
    chipIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    iconWrapperLarge: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    iconWrapperMedium: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
    },
    iconWrapperSmall: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    iconWrapperContained: {
        backgroundColor:primaryColor ? primaryColor : '#bdbdbd',
        borderColor: 'transparent',
        borderWidth: 1,
    },
    iconContained: {
        color: secondaryColor ? secondaryColor : '#ffffff',
    },
    iconWrapperOutlined: {
        backgroundColor: primaryColor ? primaryColor : '#bdbdbd',
        borderColor: 'transparent',
        borderWidth: 1,
    },
    iconOutlined: {
        color: secondaryColor ? secondaryColor : '#ffffff',
    },
    chipText: {
        color: variant === chipVariant.CONTAINED ? secondaryColor : primaryColor,
    },
    chipTextLarge: {
        fontSize: 18,
    },
    chipTextMedium: {
        fontSize: 16,
    },
    chipTextSmall: {
        fontSize: 12,
    },
});

type Props = {
    showRemoveIcon: boolean,
    chipVariant: chipVariant,
    enableBackspaceDelete: boolean,
    size: chipSize,
    inputVariant: chipVarint,
    inputStyle: *,
    inputTextStyle: *,
    placeholderStyle: *,
    chipIconAction: *,
    primaryColor: string,
    secondaryColor: string,
    iconName: string, 
}

const ReactNativeChipInput = (props: Props) => {
    const {
        showRemoveIcon,
        variant,
        size,
        inputVariant,
        inputStyle,
        inputTextStyle,
        placeholderStyle,
        chipIconAction,
        iconName,
        enableBackspaceDelete,
        primaryColor,
        secondaryColor,
    } = props;
    const [inputValues, setInputValues] = useState([]);
    const [currentInputValue, setCurrentInputValue] = useState(null);

    const themedStyles = styles(primaryColor, secondaryColor, variant);

    const getInputVariantStyle = (variantMode) => {
        switch(variantMode) {
            case chipVariant.CONTAINED:
                return themedStyles.inputContained;
            case chipVariant.STANDARD:
                return themedStyles.inputStandard;
            default:
                return themedStyles.inputOutlined; 
        }
    }

    const getChipModeStyle = (styleMode) => {
        switch(styleMode) {
            case chipVariant.CONTAINED:
                return themedStyles.chipContained;
            default:
                return themedStyles.chipOutlined;
        }
    }

    const getIconStyleWrapper = (styleMode) => {
        switch(styleMode) {
            case chipVariant.CONTAINED:
                return themedStyles.iconWrapperContained;
            default:
                return themedStyles.iconWrapperOutlined;
        }
    }

    const getIconStyle = (styleMode) => {
        switch(styleMode) {
            case chipVariant.CONTAINED:
                return themedStyles.iconContained;
            default:
                return themedStyles.iconOutlined;
        }
    }

    const getChipSizeStyle = (sizeStyle) => {
        switch(sizeStyle) {
            case chipSize.LARGE:
                return themedStyles.chipWrapperLarge;
            case chipSize.SMALL: 
                return themedStyles.chipWrapperSmall;
            default:
                return themedStyles.chipWrapperMedium;
        }
    }

    const getIconWrapperStyle = (sizeStyle) => {
        switch(sizeStyle) {
            case chipSize.LARGE:
                return themedStyles.iconWrapperLarge;
            case chipSize.SMALL:
                return themedStyles.iconWrapperSmall;
            default:
                return themedStyles.iconWrapperMedium;
        }
    }

    const getIconSize = (sizeStyle) => {
        switch(sizeStyle) {
            case chipSize.LARGE:
                return 30;
            case chipSize.SMALL:
                return 15;
            default:
                return 24;
        }
    }

    const getChipTextStyle = (styleSize) => {
        switch(styleSize) {
            case chipSize.LARGE:
                return themedStyles.chipTextLarge;
            case chipSize.SMALL:
                return themedStyles.chipTextSmall;
            default:
                return themedStyles.chipTextMedium;
        }
    }

    const onDoneButtonPress = async() => {
        if(currentInputValue !== null && inputValues.length === 0) {
            await setInputValues([...inputValues, currentInputValue]);
            setCurrentInputValue(null);
        }
        if(inputValues.length > 0 && currentInputValue !== null) {
            const isChipExist = inputValues.indexOf(currentInputValue);
            if(isChipExist === -1) {
                await setInputValues([...inputValues, currentInputValue]);
                setCurrentInputValue(null);
            }
        }
    }

    const onRemoveValue = (value) => {
        const filterInputValues = inputValues.filter(item => item !== value);
        setInputValues([...filterInputValues]);
    }

    const onBackKeyPress = (e) => {
        if(e.nativeEvent.key === "Backspace" && currentInputValue === null) {
            const filterInputValues = inputValues.filter(item => item !== inputValues[inputValues.length -1]);
            setInputValues([...filterInputValues]);
        }
    }

    return (
        <View style={[getInputVariantStyle(inputVariant), inputStyle ? inputStyle : themedStyles.inputAndChipWrapper]}>
            <View style={themedStyles.chipsContainer}>
                {
                    inputValues.map(value => (
                        <TouchableOpacity key={value} 
                            style={[
                                getChipModeStyle(variant),
                                getChipSizeStyle(size),
                                themedStyles.chipWrapper,
                            ]}
                        >
                            <Text style={[getChipTextStyle(size), themedStyles.chipText]}>{value}</Text>
                            {
                                showRemoveIcon ? (
                                    <TouchableOpacity
                                        style={[
                                            getIconStyleWrapper(variant),
                                            getIconWrapperStyle(size),
                                            themedStyles.chipIconWrapper,
                                        ]}
                                        onPress={() => chipIconAction 
                                            ? chipIconAction(value) 
                                            : onRemoveValue(value)}
                                    >
                                        <Icon name={iconName ? iconName : 'close'}
                                        size={getIconSize(size)} 
                                        style={[getIconStyle(variant)]} 
                                        />
                                    </TouchableOpacity>
                                ) : null
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
            <TextInput
                style={inputTextStyle ? inputTextStyle : themedStyles.input}
                onKeyPress={enableBackspaceDelete ? e => onBackKeyPress(e) : null}
                placeholderStyle={placeholderStyle ? placeholderStyle : themedStyles.input}
                onChangeText={(value) => setCurrentInputValue(value)}
                value={currentInputValue}
                blurOnSubmit={false}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => onDoneButtonPress()}
                {...props}
            />
        </View>
    )
}

export default ReactNativeChipInput;