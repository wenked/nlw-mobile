import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import styles from './styles';
import giveClassesBgImg from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const GiveClasses = () => {
	const { goBack } = useNavigation();

	const handdleNavigateBack = () => {
		goBack();
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				resizeMode='contain'
				source={giveClassesBgImg}
				style={styles.content}>
				<Text style={styles.title}>Quer ser o proffy?</Text>
				<Text style={styles.description}>
					Para começar, você precisa se cadastrar como professor na nossa
					plataforma web.
				</Text>
			</ImageBackground>
			<RectButton style={styles.okButton} onPress={handdleNavigateBack}>
				<Text style={styles.okButtonText}>Tudo bem</Text>
			</RectButton>
		</View>
	);
};

export default GiveClasses;
