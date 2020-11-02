import React from "react";
import { View, AsyncStorage, Stylesheet, FlatList } from "react-native";
import {
    Card,
    Button,
    Text,
    Avatar,
    Input,
    Header,
} from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import PostCard from "../components/PostCard";

const IndividualPostScreen = (props) => {
    return (<View>
        <FlatList>
            data={postList}
            renderItem={postItem => (
                <PostCard
                    name={postItem.item.name}
                    date={postItem.item.date}
                    post={postItem.item.post}
                />
                )}
        </FlatList>
    </View>
        );
};
export default IndividualPostScreen;

