import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  WebView, 
  Platform, 
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { ScreenOrientation } from 'expo'

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
        <Text>Что-то пошло не так...</Text>
      </View>
    );
  }
  render() {
    return (
      <WebView 
      style={[
        styles.container, 
        styles.vertical, 
        this.state.orientation === 'portrait' ? styles.portraitStyle : styles.landscapeStyle
      ]}
      source={{
        uri: 'https://fsostrikeball.ru?app=1',
        headers: { "OS": Platform.OS },
      }} 
      automaticallyAdjustContentInsets={ false }
      startInLoadingState = { true }
      renderLoading={ this.ActivityIndicatorLoadingView } 
      renderError={ this.ErrorHandlerView }
      />
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