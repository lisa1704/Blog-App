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
import { Feather } from '@expo/vector-icons';
import { AntDesign, Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from "../providers/AuthProvider";
import CommentCard from "../components/CommentCard";
import {
    storeDataJSON,
    getDataJSON,
    removeData,
} from "../functions/AsyncStorageFunctions";
import moment from "moment";

const PostScreen = (props) => {
    let [commentBody, setcommentBody] = useState('');
    let [commentArr, setcommentArr] = useState([]);
    let [notifArr, setnotifArr] = useState([]);
   
    const getComments = async () => {
        await getDataJSON(props.route.params.post).then((data) => {
            if (data!= null) {
                setcommentArr(data);
            } else setcommentArr([]);
        });
    };
    let notify = props.route.params.email.concat("notify");

    const getNotifications = async () => {
        await getDataJSON(props.route.params.post).then((data) => {
            if (data == null) {
                setnotifArr([]);
            } else setnotifArr(data);
        });
    };

    useEffect(() => {
        getComments();
    }, [])
    useEffect(() => {
        getNotifications();
    }, [notifArr]);

    
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View>
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
                    <View>
                        <Card>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    containerStyle={{ backgroundColor: "#ffab91" }}
                                    rounded
                                    icon={{ name: "user", type: "font-awesome", color: "black" }}
                                    activeOpacity={1}
                                />
                                <Text h4Style={{ padding: 10 }} h4>
                                    {props.route.params.name}
                                </Text>
                            </View>
                            <Text style={{ fontStyle: "italic" }}> Posted on {props.date}</Text>
                            <Text
                                style={{
                                    paddingVertical: 10,
                                }}
                            >
                                {props.route.params.post}
                            </Text>
                            <Input
                                placeholder="Write a comment"
                                leftIcon={<FontAwesome5 name="comments" size={24} color="black" />}
                                onChangeText={function (currentInput) {
                                    setcommentBody(currentInput);
                                }}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Button
                                    type="outline"
                                    title="Comment"
                                    icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
                                    onPress={async function () {
                                        let a = [
                                            ...commentArr,
                                            {
                                                name: auth.CurrentUser.name,
                                                email: auth.CurrentUser.email,
                                                date: moment().format(),
                                                comment: commentBody,
                                                key: commentBody
                                            }
                                        ];
                                        await storeDataJSON(props.route.params.post, a).then(() => {
                                            setcommentArr(a);
                                        });
                                        if (auth.CurrentUser.email != props.route.params.email) {
                                            let n = [
                                                ...notifArr,
                                                {
                                                    name: props.route.params.name,
                                                    email: props.route.params.email,
                                                    date: moment().format("DD MMM, YYYY"),
                                                    post: props.route.params.post,
                                                    notification: auth.CurrentUser.name.concat(" has commented on your post"),
                                                    key: commentBody,
                                                    type: "comment",
                                                }
                                            ];
                                            await storeDataJSON(notify, n).then(() => {
                                                setnotifArr(n);
                                            });
                                        }

                                    }}



                                />
                            </View>


                        </Card>
                        <FlatList
                            data={commentArr}
                            renderItem={cItem => (
                                <CommentCard
                                    name={cItem.item.name}
                                    email={cItem.item.email}
                                    comment={cItem.item.comment}
                                />
                            )}
                        />
                    </View>
                </View>
            )}
        </AuthContext.Consumer>
    );

};
export default PostScreen;
