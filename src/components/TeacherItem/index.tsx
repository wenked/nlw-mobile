import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
//import TeacherType from '../../pages/TeacherList';

interface TeacherType {
	id: number;
	subject: string;
	cost: number;
	user_id: number;
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
}

interface TeacherItemProps {
	teacher: {
		id: number;
		subject: string;
		cost: number;
		user_id: number;
		name: string;
		avatar: string;
		whatsapp: string;
		bio: string;
	};
	favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
	const [isFavorited, setIsFavorited] = useState(favorited);

	const handleLinkToWhatsApp = () => {
		api.post('connections', {
			user_id: teacher.id,
		});
		Linking.openURL(`whatsapp://send?phone${teacher.whatsapp}`);
	};

	const handleToggleFavorite = async () => {
		const favorites = await AsyncStorage.getItem('favorites');

		let favoritesArray = [];

		if (favorites) {
			favoritesArray = JSON.parse(favorites);
		}
		if (isFavorited) {
			const favoriteIndex = favoritesArray.findIndex(
				(teacherItem: TeacherType) => {
					return teacherItem.id === teacher.id;
				}
			);

			favoritesArray.splice(favoriteIndex, 1);
			setIsFavorited(false);
		} else {
			favoritesArray.push(teacher);
			setIsFavorited(true);
		}
		await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
	};

	return (
		<View style={styles.container}>
			<View style={styles.profile}>
				<Image
					source={{
						uri: teacher.avatar,
					}}
					style={styles.avatar}
				/>
				<View style={styles.profileInfo}>
					<Text style={styles.name}>{teacher.name}</Text>
					<Text style={styles.subject}>{teacher.subject}</Text>
				</View>
			</View>
			<Text style={styles.bio}>{teacher.bio}</Text>

			<View style={styles.footer}>
				<Text style={styles.price}>
					Preço/Hora{'   '}
					<Text style={styles.priceValue}>{teacher.cost}</Text>
				</Text>

				<View style={styles.buttonsContainer}>
					<RectButton
						onPress={handleToggleFavorite}
						style={[
							styles.favoriteButton,
							isFavorited ? styles.favorited : {},
						]}>
						{isFavorited ? (
							<Image source={unfavoriteIcon} />
						) : (
							<Image source={heartOutlineIcon} />
						)}
					</RectButton>
					<RectButton
						style={styles.contactButton}
						onPress={handleLinkToWhatsApp}>
						<Image source={whatsappIcon} />
						<Text style={styles.contactButtonText}>Entrar em contato</Text>
					</RectButton>
				</View>
			</View>
		</View>
	);
};

export default TeacherItem;
