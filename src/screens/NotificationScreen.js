import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { FlatList } from "react-native";
import { NotificationCard } from "../components/NotificationCard";
import { getDataJSON } from "../functions/AsyncStorageFunctions";
const NotificationScreen = (props) => {
    const [notifArr, setnotifArr] = useState([]);
    let notify = email.concat("notify");
    const [email, setemail] = useState("");

    const getNotifications = async () => {
        await getDataJSON(notify).then((data) => {
            if (data != null) {
                setnotifArr(data);
            } else
                setnotifArr([]);
        });
    };
    const getEmails = async () => {
        await getDataJSON(mail).then((data) => {
            if (data != null) {
                setemail(data);
            } else
                setemail([]);
        });
    };
    useEffect(() => {
        getNotifications();
    }, [notifArr])
    useEffect(() => {
        getEmails();
    }, [])


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
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Avatar
                                containerStyle={{ backgroundColor: "cyan" }}
                                rounded
                                icon={{
                                    name: "thumbs-o-up",
                                    type: "font-awesome",
                                    color: "black",
                                }}
                                activeOpacity={1}
                            />
                            <FlatList
                                data={notifArr}
                                renderItem={
                                    nItem => (
                                        <View>
                                            <NotificationCard
                                                name={nItem.item.name}
                                                email={nItem.item.email}
                                                date={nItem.item.date}
                                                post={nItem.item.post}
                                                notification={nItem.item.notification}
                                                type={nItem.item.type}
                                            />
                                            <Card.Divider/>
                                        </View>
                                )}
                            />

                        </View>
                    </Card>
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

export default NotificationScreen;
