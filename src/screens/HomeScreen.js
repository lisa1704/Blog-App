import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
import {
    Card,
    Button,
    Text,
    Avatar,
    Input,
    Header,
} from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import PostCard from "../components/PostCard";
import {
    storeDataJSON,
    getDataJSON,
    removeData,
} from "../functions/AsyncStorageFunctions";
import moment from "moment";

const HomeScreen = (props) => {
    const [postBody, setpostBody] = useState("");
    const [postArr, setpostArr] = useState([]);
    const getData = async () => {
        await getDataJSON("posts").then((data) => {
            if (data == null) {
                setpostArr([]);
            } else setpostArr(data);
        });
    };

    const init = async () => {
        await removeData("posts");
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <Header
                        backgroundColor="blue"
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
                    <Card containerStyle={{ backgroundColor: "#ffff" }}>
                        <Input
                            placeholder="What's On Your Mind?"
                            leftIcon={<Entypo name="pencil" size={24} color="#152a38" />}
                            onChangeText={function (currentInput) {
                                setpostBody(currentInput);
                            }}
                        />
                        <Button
                            buttonStyle={{ borderColor: "#29435c" }}
                            title="Post"
                            titleStyle={{ color: "#29435c" }}
                            type="outline"
                            onPress={async () => {
                                let arr = [
                                    ...postArr,
                                    {
                                        name: auth.CurrentUser.name,
                                        email: auth.CurrentUser.email,
                                        date: moment().format("DD MMM, YYYY"),
                                        post: postBody,
                                        key: postBody,
                                    },
                                ];

                                await storeDataJSON("posts", arr).then(() => {
                                    setpostArr(arr);
                                });

                                //alert("Post Successful!");
                                //setPostText("");
                            }}
                        />
                        <Button
                            buttonStyle={{ borderColor: "black" }}
                            title="Delete Post"
                            titleStyle={{ color: "#29435c" }}
                            type="outline"
                            onPress={async function () {
                                await removeData("Post");
                            }}
                        /> 
                    </Card>
                    <FlatList
                        data={postArr}
                        renderItem={(pItem) => (
                            <PostCard
                                name={pItem.item.name}
                                date={pItem.item.date}
                                post={pItem.item.post}
                            />
                        )}
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
        backgroundColor: "#fff",
    },
});

export default HomeScreen;
