import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import {
	TextInput,
	BorderlessButton,
	RectButton,
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
//expo Picker

export interface TeacherType {
	id: number;
	subject: string;
	cost: number;
	user_id: number;
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
}

const TeacherList = () => {
	const [isFiltersVisible, setIsFiltersVisible] = useState(false);
	const [subject, setSubject] = useState('');
	const [week_day, setWeekDay] = useState('');
	const [time, setTime] = useState('');
	const [teachers, setTeachers] = useState([]);
	const [favorites, setFavorites] = useState<number[]>([]);

	const loadFavorites = () => {
		AsyncStorage.getItem('favorites').then((response) => {
			if (response) {
				const favoritedTeachers = JSON.parse(response);
				const favoritedTeachersId = favoritedTeachers.map(
					(teacher: TeacherType) => {
						return teacher.id;
					}
				);
				setFavorites(favoritedTeachersId);
			}
		});
	};

	useFocusEffect(() => {
		loadFavorites();
	});

	const handleToggleFiltersVisible = () => {
		setIsFiltersVisible(!isFiltersVisible);
	};

	const handleFiltersSubmit = async () => {
		loadFavorites();
		const response = await api.get('/classes', {
			params: { subject, week_day: Number(week_day), time },
		});

		setTeachers(response.data);
		setIsFiltersVisible(false);
	};

	return (
		<View style={styles.container}>
			<PageHeader
				title='Proffys disponíveis'
				headerRight={
					<BorderlessButton onPress={handleToggleFiltersVisible}>
						<Feather name='filter' size={20} color='#FFF' />
					</BorderlessButton>
				}>
				{isFiltersVisible ? (
					<View style={styles.searchForm}>
						<Text style={styles.label}>Matéria</Text>
						<TextInput
							placeholderTextColor='#c1bccc'
							style={styles.input}
							placeholder='Qual a matéria?'
							value={subject}
							onChangeText={(text) => setSubject(text)}
						/>

						<View style={styles.inputGroup}>
							<View style={styles.inputBlock}>
								<Text style={styles.label}>Dia da semana</Text>
								<TextInput
									placeholderTextColor='#c1bccc'
									style={styles.input}
									placeholder='Qual o dia?'
									value={week_day}
									onChangeText={(text) => setWeekDay(text)}
								/>
							</View>

							<View style={styles.inputBlock}>
								<Text style={styles.label}>Horário</Text>
								<TextInput
									placeholderTextColor='#c1bccc'
									style={styles.input}
									placeholder='Qual o horário?'
									value={time}
									onChangeText={(text) => setTime(text)}
								/>
							</View>
						</View>
						<RectButton
							style={styles.submitButton}
							onPress={handleFiltersSubmit}>
							<Text style={styles.submitButtonText}>Filtrar</Text>
						</RectButton>
					</View>
				) : null}
			</PageHeader>

			<ScrollView
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
				}}>
				{teachers.map((teacher: TeacherType) => (
					<TeacherItem
						teacher={teacher}
						key={teacher.id}
						favorited={favorites.includes(teacher.id)}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default TeacherList;
