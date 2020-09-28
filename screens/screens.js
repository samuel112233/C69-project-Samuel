import * as React from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';



export default class ScanScreen extends React.Component{
    constructor(){
        super()
        this.state={
          hasCameraPermissions:null,
          scanned:false,
          scannedData:'',
          buttonState:'normal'
        }
    }
    getCemeraPermissions=async()=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:'clicked',
            scanned:false,
            
        })
    }

    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState==='clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned? undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>

            )
        }
        else if(
            buttonState === 'normal'){
                return(
                    <View style={styles.container}>
                      <View>
                          <Text>BarCodeScanner</Text>
                      </View>

                <Text style={styles.displayText}>{hasCameraPermissions===true? this.state.scannedData:'Request Cemera Permission'}</Text>
                <TouchableOpacity onPress={this.getCemeraPermissions} 
                style={styles.button}
                title='barCodeScanner'>

                    <Text>Scan QR Code</Text>
                    

                </TouchableOpacity>
                    </View>
                ) 
            }
    
        
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    button:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });
