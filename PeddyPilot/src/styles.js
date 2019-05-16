import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    cameraPreview: {
        height: winHeight,
        width: winWidth,
        alignSelf: 'center',
    },

    container: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },

    containerCamera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    QRpage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    TextInput:{
        width: "100%",
        height: 40,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#C41F27",
        textAlign: "center",
    },

    ShowButton: {
        width: "100%",
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: "#C41F27",
        borderRadius: 7,
        marginBottom: 20,
    },

    TextStyle:{
        color: "#FFF",
        textAlign: "center",
        fontSize: 18,
    },

    TextTitle:{
        color: "#C41F27",
        textAlign: "center",
        fontSize: 18,
    },

    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        flexDirection: 'row',
    },
    url: {
        flex: 1,
    },
    urlText: {
        color: '#fff',
        fontSize: 20,
    },
    cancelButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
    },
});