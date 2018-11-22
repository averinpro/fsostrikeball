import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,  
  Platform, 
  WebView,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  RefreshControl,
  Button
} from 'react-native';
import { ScreenOrientation } from 'expo'
//import { WebView } from "react-native-webview";

export default class MainActivity extends Component {
  constructor() {
    super();
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape'
    };
    
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });
  }
  componentWillMount() {
    ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN);
  }
  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color='#FFFFFF'
        size='large'
        style={ [styles.container, styles.vertical] }
      />
    );
  }
  ErrorHandlerView() {
    return (
      <View style={ [styles.container, styles.vertical] }>
        <Text>Нет доступа к интернету. Проверьте работу интернета и попробуйте еще раз...</Text>
        <Button title="Повторить попытку" onPress={() => { WebViewRef && WebViewRef.reload();}}/>
      </View>
    );
  }
  render() {
    let webview;
    return (
    <ScrollView
        //bounces={false}
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl
            title='Обновление'
            refreshing={this.state.refreshing}
            onRefresh={() => { 
              this.setState({refreshing: true}); 
              WebViewRef && WebViewRef.reload(); 
              this.setState({refreshing: false});
            }}
          />
        }
      >
      <WebView 
      ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
      style={[
        styles.container, 
        styles.vertical, 
        this.state.orientation === 'portrait' ? styles.portraitStyle : styles.landscapeStyle
      ]}
      source={{
        uri: 'https://fsostrikeball.ru?app=1',
        headers: { "OS": Platform.OS }, // Можно добавить информацию о версии приложения для дальнейшей статистики
      }} 
      automaticallyAdjustContentInsets={ false }
      startInLoadingState = { true }
      renderLoading={ this.ActivityIndicatorLoadingView } 
      renderError={ this.ErrorHandlerView }
      />
    </ScrollView>
    );
  }
}
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  vertical: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  portraitStyle: {
    marginTop: (Platform.OS) === 'ios' ? 20 : 0,
  },
  landscapeStyle: {
    marginTop: 0,
  }
});