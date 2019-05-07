import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    cameraPreview: {
        height: winHeight,
        width: winWidth,
        alignSelf: 'center',
    },
});