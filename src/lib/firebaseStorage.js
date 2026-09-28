// Firebase Storage helper for uploading and managing media files

// Firebase Storage helper for uploading and managing media files
import { getStorage, ref, deleteObject } from 'firebase/storage';
import app from './firebase';

// Initialize storage - Firebase will automatically use the default bucket from your config
const storage = getStorage(app);

// Verify storage bucket is configured
if (!storage.app._options.storageBucket) {
	console.warn(
		'⚠️ Storage bucket not configured. Make sure VITE_FIREBASE_STORAGE_BUCKET is set in .env'
	);
}


















// import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
// import app from './firebase';
// import { supabase } from './supabaseClient';

// // Initialize storage - Firebase will automatically use the default bucket from your config
// const storage = getStorage(app);

// // Verify storage bucket is configured
// if (!storage.app._options.storageBucket) {
// 	console.warn(
// 		'⚠️ Storage bucket not configured. Make sure VITE_FIREBASE_STORAGE_BUCKET is set in .env'
// 	);
// }

/**
 * Upload a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - Storage path (e.g., 'posts/media/')
 * @returns {Promise<string>} - Download URL of the uploaded file
 */
// export async function uploadFile(file, path = 'posts/media/') {
// 	if (!file) throw new Error('No file provided');

// 	const timestamp = Date.now();
// 	const fileName = `${timestamp}_${file.name}`;
// 	const filePath = `${path}${fileName}`;

// 	try {
// 		// Create reference with full path
// 		const storageRef = ref(storage, filePath);

// 		// Log debug info
// 		console.log('Uploading to:', filePath);
// 		console.log('Storage bucket:', storage.app.options.storageBucket);
// 		console.log('Storage ref:', storageRef.toString());

// 		// Upload the file
// 		const uploadResult = await uploadBytes(storageRef, file);
// 		console.log('File uploaded successfully:', uploadResult.metadata);

// 		// Get the download URL
// 		const downloadURL = await getDownloadURL(uploadResult.ref);
// 		console.log('Download URL:', downloadURL);
// 		return downloadURL;
// 	} catch (error) {
// 		console.error('Error uploading file:', error.message, error.code);
// 		console.error('Full error:', error);
// 		// Common issues:
// 		// - 'storage/unauthenticated' = user not authenticated
// 		// - 'storage/unauthorized' = security rules deny access
// 		// - 'storage/retry-limit-exceeded' = network error
// 		throw new Error(`Upload failed: ${error.message} (${error.code})`);
// 	}
// }

export async function uploadFile(file) {
	if (!file) throw new Error('No file provided');

	const fileName = `${Date.now()}_${file.name}`;
	const { data, error } = await supabase.storage.from('posts').upload(fileName, file);
	if (error) {
		console.error('Upload error:', error);
		throw error;
	}

	// Get public URL
	const mediaData = supabase.storage.from('posts').getPublicUrl(fileName);

	const publicUrl = mediaData.data.publicUrl;
	console.log(publicUrl);
	return publicUrl;
}

/**
 * Upload a portrait photo for a user to Supabase Storage
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - Public URL of the uploaded portrait
 */
export async function uploadUserPortrait(file) {
	if (!file) throw new Error('No file provided');

	const fileName = `${Date.now()}_${file.name}`;
	const { data, error } = await supabase.storage.from('users').upload(fileName, file);

	if (error) {
		console.error('Portrait upload error:', error);
		throw error;
	}

	// Get public URL
	const portraitData = supabase.storage.from('users').getPublicUrl(fileName);
	const publicUrl = portraitData.data.publicUrl;
	console.log('Portrait uploaded:', publicUrl);
	return publicUrl;
}

/**
 * Upload multiple files
 * @param {FileList} files - Files to upload
 * @param {string} path - Storage path
 * @returns {Promise<string[]>} - Array of download URLs
 */
export async function uploadMultipleFiles(files, path = 'posts/media/') {
	const urls = [];

	for (let file of files) {
		try {
			const url = await uploadFile(file);
			urls.push(url);
		} catch (error) {
			console.error(`Failed to upload ${file.name}:`, error);
		}
	}
	return urls;
}

/**
 * Delete a file from Supabase Storage by URL
 * @param {string} url - The public URL of the file
 */
export async function deleteSupabaseFile(url) {
	if (!url) return;

	try {
		// Extract file name from URL
		// Format: https://xxx.supabase.co/storage/v1/object/public/bucket-name/file-name
		const urlParts = url.split('/');
		const fileName = urlParts[urlParts.length - 1];
		const bucket = urlParts[urlParts.length - 2];

		// Determine which bucket the file is in and delete from that bucket
		if (bucket === 'posts' || bucket === 'users') {
			const { error } = await supabase.storage.from(bucket).remove([fileName]);
			if (error) {
				console.error(`Error deleting file from ${bucket}:`, error);
				throw error;
			}
		}
	} catch (error) {
		console.error('Error deleting file:', error);
		throw error;
	}
}

/**
 * Delete a file from Firebase Storage by URL
 * @param {string} downloadURL - The download URL of the file
 */
export async function deleteFileByURL(downloadURL) {
	try {
		// Extract the path from the download URL
		// Format: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{path}?alt=media&token=...
		const decodedURL = decodeURIComponent(downloadURL);
		const pathMatch = decodedURL.match(/\/o\/(.+?)(\?|$)/);

		if (!pathMatch || !pathMatch[1]) throw new Error('Invalid URL format');

		const path = pathMatch[1];
		const storageRef = ref(storage, path);
		await deleteObject(storageRef);
	} catch (error) {
		console.error('Error deleting file:', error);
		throw error;
	}
}

/**
 * Delete multiple files by URL
 * @param {string[]} urls - Array of download URLs
 */
export async function deleteMultipleFiles(urls) {
	for (let url of urls) {
		try {
			await deleteFileByURL(url);
		} catch (error) {
			console.error('Failed to delete file:', error);
		}
	}
}

/**
 * Check if a URL is an image
 */
export function isImageURL(url) {
	return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
}

/**
 * Check if a URL is a video
 */
export function isVideoURL(url) {
	return /\.(mp4|mpeg|webm|ogg|mov|avi)$/i.test(url);
}
