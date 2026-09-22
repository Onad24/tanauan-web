import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const languages = [
	{ code: 'en', label: 'English', short: 'EN' },
	{ code: 'fil', label: 'Filipino', short: 'FIL' },
	{ code: 'war', label: 'Waray-Waray', short: 'WAR' }
];

const savedLang = browser ? localStorage.getItem('tanauan_portal_lang') || 'en' : 'en';
export const currentLang = writable(savedLang);

if (browser) {
	currentLang.subscribe((val) => {
		try {
			localStorage.setItem('tanauan_portal_lang', val);
		} catch (e) {
			// ignore storage errors
		}
	});
}

export const translations = {
	en: {
		home: 'HOME',
		ourMunicipality: 'OUR MUNICIPALITY',
		offices: 'OFFICES',
		localOffices: 'Local Government Offices',
		nationalOffices: 'National Government Agencies',
		tourism: 'TOURISM',
		newsReleases: 'NEWS RELEASES',
		transparency: 'TRANSPARENCY',
		contactUs: 'CONTACT US',
		search: 'Search pages...',
		welcomeBadge: 'Welcome to Tanauan, Leyte',
		tagline: 'Cradle of Intellectuals • Bungto han Kamag-araman',
		exploreTanauan: 'Explore Tanauan',
		announcements: 'ANNOUNCEMENTS',
		emergencyHotlines: 'Emergency Hotlines',
		viewAll: 'View All',
		localClimate: 'Local Climate & Weather',
		pagasaBulletin: 'DOST-PAGASA Bulletin',
		faq: 'FAQ',
		survey: 'Citizen Survey',
		feedbackPrompt: 'Citizen Satisfaction & Feedback',
		emergencyQuickCall: 'Emergency & Hotline Numbers',
		mayorTitle: 'Municipal Mayor',
		viceMayorTitle: 'Municipal Vice Mayor',
		sanggunianBayan: 'Sangguniang Bayan',
		executiveBranch: 'Executive Branch',
		legislativeBranch: 'Legislative Branch',
		readMore: 'Read More',
		allRightsReserved: 'All rights reserved',
		republicOfPhilippines: 'Republic of the Philippines',
		provinceOfLeyte: 'Province of Leyte'
	},
	fil: {
		home: 'TAHANAN',
		ourMunicipality: 'ATING BAYAN',
		offices: 'MGA TANGGAPAN',
		localOffices: 'Mga Lokal na Tanggapan ng Pamahalaan',
		nationalOffices: 'Mga Pambansang Ahensya ng Pamahalaan',
		tourism: 'TURISMO',
		newsReleases: 'MGA BALITA',
		transparency: 'KATAPATAN AT DIBULGASYON',
		contactUs: 'MAKIPAG-UGNAYAN',
		search: 'Maghanap sa pahina...',
		welcomeBadge: 'Maligayang Pagdating sa Tanauan, Leyte',
		tagline: 'Duyan ng mga Dalubhasa • Bungto han Kamag-araman',
		exploreTanauan: 'Tuklasin ang Tanauan',
		announcements: 'MGA PAUNAWÀ',
		emergencyHotlines: 'Mga Hotline sa Sakuna',
		viewAll: 'Tingnan Lahat',
		localClimate: 'Klima at Panahon',
		pagasaBulletin: 'Ulat ng DOST-PAGASA',
		faq: 'Mga Karaniwang Tanong',
		survey: 'Sarbey sa Serbisyong Publiko',
		feedbackPrompt: 'Puna at Kasiyahan ng Mamamayan',
		emergencyQuickCall: 'Mga Numero sa Sakuna',
		mayorTitle: 'Punong Bayan',
		viceMayorTitle: 'Pangalawang Punong Bayan',
		sanggunianBayan: 'Sangguniang Bayan',
		executiveBranch: 'Sangay Tagapagpaganap',
		legislativeBranch: 'Sangay Tagapagbatas',
		readMore: 'Magbasa Pa',
		allRightsReserved: 'Lahat ng karapatan ay reserbado',
		republicOfPhilippines: 'Republika ng Pilipinas',
		provinceOfLeyte: 'Lalawigan ng Leyte'
	},
	war: {
		home: 'BALAY',
		ourMunicipality: 'ATON BUNGTO',
		offices: 'MGA OPISINA',
		localOffices: 'Mga Lokal nga Opisina han Bungto',
		nationalOffices: 'Mga Nasyunal nga Ahensya han Gobyerno',
		tourism: 'TURISMO',
		newsReleases: 'MGA SUMAT',
		transparency: 'PANALIMPOKO',
		contactUs: 'PAKIG-SUMAT',
		search: 'Pamiling ha mga pahina...',
		welcomeBadge: 'Maupay nga Pag-abot ha Tanauan, Leyte',
		tagline: 'Bungto han Kamag-araman',
		exploreTanauan: 'Pasiplatan an Tanauan',
		announcements: 'MGA PAHIBARO',
		emergencyHotlines: 'Mga Numero ha Katalagman',
		viewAll: 'Kitaa Ngatanan',
		localClimate: 'Klima ngan Panahon',
		pagasaBulletin: 'Pasamwak han DOST-PAGASA',
		faq: 'Kaurugan nga mga Pakiana',
		survey: 'Sarbey han Bungtohanon',
		feedbackPrompt: 'Panlantaw han mga Molupyo',
		emergencyQuickCall: 'Mga Numero ha Katalagman',
		mayorTitle: 'Alkalde han Bungto',
		viceMayorTitle: 'Bise Alkalde han Bungto',
		sanggunianBayan: 'Sangguniang Bayan',
		executiveBranch: 'Sangay Ehekutibo',
		legislativeBranch: 'Sangay Lehislatibo',
		readMore: 'Basaha Pa',
		allRightsReserved: 'Reserbado an ngatanan nga katungod',
		republicOfPhilippines: 'Republika han Pilipinas',
		provinceOfLeyte: 'Probinsya han Leyte'
	}
};
