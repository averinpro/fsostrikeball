import React, { Component } from 'react';
import { StyleSheet, WebView, Platform, ActivityIndicator, View, Text, Button} from 'react-native';

export default class MainActivity extends Component {
  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color='#FFFFFF'
        size='large'
        style={styles.ActivityIndicatorStyle}
      />
    );
  }
  render() {
    let WebViewRef;
    return (
      <WebView 
      style={styles.WebViewStyle} 
      //(Platform.OS) Добавить в URL
      ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
      source={{uri: 'https://fsostrikeball.ru?app=1'}} 
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      automaticallyAdjustContentInsets={false}
      onNavigationStateChange={this._onNavigationStateChange}
      renderLoading={this.ActivityIndicatorLoadingView} 
      onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
      startInLoadingState={true}  
      scalesPageToFit={true}
      renderError={()=>{
        return (
          <View>
          <Text>
            У нас возникли проблемы с подключением к интернету. Давайте проверим его работе и повторим попытку еще раз
          </Text>
          <Button
            onpress={()=>{ WebViewRef && WebViewRef.reload();}}
            title="Обновить"
            color="#841584"
            accessibilityLabel="Попробовать еще раз"
          />
          </View>
        )
      }}
      />
    );
  }
}
   
const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },

  ActivityIndicatorStyle: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      backgroundColor: 'black',
      justifyContent: 'center'
  }
});