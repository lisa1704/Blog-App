import { useState, useEffect } from "react";
import { storeData, storeDataJSON, getData, getDataJSON, removeData, mergeData } from "./../functions/AsyncStorageFunctions";
import { AuthContext } from "../providers/AuthProvider";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Button } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import { Feather } from '@expo/vector-icons';

const NotificationCard = (props) => {
    const Navg = useNavigation();
    return (
        <View>
            {(props.type == "comment") ?
                <Button buttonStyle={styles.buttonStyle}
                    type="clear"
                    icon={<FontAwesome name="comment" size={24} color='#152a38' />}
                    title={props.notification}
                    titleStyle={{ color: '#152a38' }}
                    onPress={function () {
                        Navg.navigate("My Posts", { post: props.post, name: props.name, date: props.date, email: props.email });
                    }}

                /> :
                <Button buttonStyle={styles.buttonStyle}
                    type="clear"
                    icon={<AntDesign name="like1" size={24} color='#152a38' />}
                    title={props.notification}
                    titleStyle={{ color: '#152a38' }}
                    onPress={function () {
                        Navg.navigate("My Posts", { post: props.post, name: props.name, date: props.date, email: props.email });
                    }}

                />
            }
        </View>
    );
};
export default NotificationCard;
