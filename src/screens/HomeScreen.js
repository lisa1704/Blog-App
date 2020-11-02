import React, { useState, useEffect } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import {
    Card,
    Button,
    Text,
    Avatar,
    Input,
    Header,
} from "react-native-elements";
import { AsyncStorage } from "react-native";
import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { getPosts } from "./../requests/Posts";
import { getUsers } from "./../requests/Users";
import moment from "moment";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsyncStorageFunctions";

const HomeScreen = (props) => {
    const [postBody, setpostBody] = useState("");
    const [postList, setpostList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            setpostList(await getDataJSON('posts'));
        }
        getData();
    }, []);

    return (
            <AuthContext.Consumer>
                {(auth) => (
                    <View style={styles.viewStyle}>
                        <Header
                            leftComponent={{
                                icon: "menu",
                                color: "#fff",
                                onPress: function () {
                                    props.navigation.toggleDrawer();
                                },
                            }}
                            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
                            rightComponent={{
                                icon: "lock-outline",
                                color: "#fff",
                                onPress: function () {
                                    auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
                                },
                            }}
                        />
                        <Card>
                            <Input
                                placeholder="What's On Your Mind?"
                                leftIcon={<Entypo name="pencil" size={24} color="black" />}
                                onChangeText={function (currentText) {
                                    setpostBody(currentText);
                                }}
                            />
                            <Button
                                title="Post"
                                type="outline"
                                onPress={async()=> {
                                if (postList != null) {
                                    setpostList(posts => [
                                        ...posts,
                                    {
                                        name: auth.CurrentUser.name,
                                        email: auth.CurrentUser.email,
                                        date: moment().format(),
                                        post: postBody,
                                        key: postBody
                                    },

                                    ]);
                                }
                                else {
                                    const a = [];
                                    a.push({
                                        name: auth.CurrentUser.name,
                                        email: auth.CurrentUser.email,
                                        date: moment().format(),
                                        post: postBody,
                                        key: postBody
                                    });
                                    setpostList(a);
                                }
                                await storeDataJSON('posts', postList);
                                }
                            }
                            />
                            <Button
                                title="Delete Post"
                                type="outline"
                                onPress={async () => { await removeData("Post"); }}
                            />
                        </Card>

                        <FlatList
                        data={postList}
                        renderItem={function ({ postItem}){
                              
                                    <PostCard
                                        name={postItem.item.name}
                                        date={postItem.item.date}
                                        post={postItem.item.post}
                                    />
                             
                            }}
                        />
                    </View>
                )}
            </AuthContext.Consumer>
        );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "blue",
    },
    viewStyle: {
        flex: 1,

    },
});

export default HomeScreen;
