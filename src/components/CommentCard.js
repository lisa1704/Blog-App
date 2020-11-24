import { useState, useEffect } from "react";
import { storeData, storeDataJSON, getData, getDataJSON, removeData, mergeData } from "./../functions/AsyncStorageFunctions";
import { AuthContext } from "../providers/AuthProvider";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, TextInput } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import { Feather } from '@expo/vector-icons';

const CommentCard = (props) => {
    return (<View>
        <Card>
            <View>
                <Avatar
                    rounded
                    icon={<Feather name="user" size={24} color="black" />}
                    activeOpacity={0.7}
                />
                <Text>{props.name}</Text>
                <Text>{props.date}</Text>
                <View>
                    <Text>{props.comment}</Text>
                </View>
            </View>
        </Card>
    </View>);

};
export default CommentCard;
