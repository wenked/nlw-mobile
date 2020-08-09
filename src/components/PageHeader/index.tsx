import React, { ReactNode } from 'react';
import sytles from './styles';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';
import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';

interface Props {
	title: string;
	headerRight?: ReactNode;
}

const PageHeader: React.FC<Props> = ({ title, children, headerRight }) => {
	const { navigate } = useNavigation();
	const handleGoBack = () => {
		navigate('Landing');
	};

	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<BorderlessButton onPress={handleGoBack}>
					<Image source={backIcon} resizeMode='contain' />
				</BorderlessButton>
				<Image source={logoImg} resizeMode='contain' />
			</View>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				{headerRight}
			</View>

			{children}
		</View>
	);
};

export default PageHeader;
