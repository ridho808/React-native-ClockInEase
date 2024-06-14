import EncryptedStorage from 'react-native-encrypted-storage';

export const StoreData =async (Key,Value) =>{
    try {
        await EncryptedStorage.setItem(Key,Value);
        return "Success Save Data"
    } catch (error) {
        console.log(error);
    }
}

export const GetDataStore = async (Key) =>{
    try {
        const Data = await EncryptedStorage.getItem(Key);
        return Data
    } catch (error) {
        console.log("GET DATA : ",error);
        return null        
    }
}

export const RemoveData = async (Key) =>{
    try {
        await EncryptedStorage.removeItem(Key);
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export const ClearStroge = async () =>{
    try {
        await EncryptedStorage.clear();
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}