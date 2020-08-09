import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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

const Favorites = () => {
	const [favorites, setFavorites] = useState([]);

	const loadFavorites = () => {
		AsyncStorage.getItem('favorites').then((response) => {
			if (response) {
				const favoritedTeachers = JSON.parse(response);

				setFavorites(favoritedTeachers);
			}
		});
	};

	useFocusEffect(() => {
		loadFavorites();
	});

	return (
		<View style={styles.container}>
			<PageHeader title='Proffys disponíveis'></PageHeader>
			<ScrollView
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
				}}>
				{favorites.map((teacher: TeacherType) => {
					return <TeacherItem key={teacher.id} teacher={teacher} favorited />;
				})}
			</ScrollView>
		</View>
	);
};

export default Favorites;
