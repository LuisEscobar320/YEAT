import React from 'react';
import {Text, View, Linking, StyleSheet, TextInput, Button} from 'react-native'

export default class ErrorScreen extends React.Component {
	/* wait for 5 seconds before redirecting to login */
	var start = new Date().getTime();
	while((new Date().getTime() - start) < 5000) {
		var lmao = 0;
	}
	this.props.navigation.navigate('TritonCard');

	render() {
		return (
			<View>
				<Text>
					Error logging into Triton Card account. Incorrect username/password detected. Please log in using correct credentials.
				</Text>
			</View>
		)
	}
}
