import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
import { Text, Card, Button, Avatar, Accessory, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { Ionicons } from '@expo/vector-icons';
const ProfileScreen = (props) => {

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
                        centerComponent={{ text: "My Profile", style: { color: "#fff" } }}
                        rightComponent={{
                            icon: "lock-outline",
                            color: "#fff",
                            onPress: function () {
                                auth.setIsLoggedIn(false);
                                auth.setCurrentUser({});
                            },
                        }}
                    />
                    <View style={styles.imageViewStyle}>
                        { /* <TouchableOpacity style={styles.avatarPlaceholder}>
                            <Ionicons
                                name="ios-add"
                                size={40}
                                color="#FFF"
                                style={{ marginTop: 55, alignSelf: "center" }}
                            />
                        </TouchableOpacity>*/}
                        <Avatar
                            rounded
                            activeOpacity={0.7}
                            size="xlarge"
                            source={{
                                uri:
                                    'https://scontent.fdac37-1.fna.fbcdn.net/v/t1.0-9/41871769_2115253698802769_1077357610937614336_n.jpg?_nc_cat=106&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeEJMk41YbLcJG-oNJ0r8UHYamkAvE2UaotqaQC8TZRqi9vYaszKI9h0qy9qveAqGVQJoUDjBFHDoIJroP79txpo&_nc_ohc=YEy21tChJhoAX9pd-8u&_nc_ht=scontent.fdac37-1.fna&oh=3d60f86dcff46e59bc887f8d33a480a9&oe=5FC63D69',
                            }}
                        />
                        <Accessory
                        />
                        <Text style={styles.userTextStyle}>{auth.CurrentUser.name}</Text>
                    </View>
                    <View style={styles.infoviewStyle}>
                        <Text style={styles.infotextStyle}>Born on:{auth.CurrentUser.bornon}</Text>
                        <Text style={styles.infotextStyle}>Lives at:{auth.CurrentUser.livesat}</Text>
                        <Text style={styles.infotextStyle}>Works at:{auth.CurrentUser.worksat}</Text>
                    </View>
                    <View>
                        <Button
                            buttonStyle={{ backgroundColor: "blue", width: "50%", alignSelf: "center", padding: 5, paddingTop: 3, marginTop:30 }}
                            title="Edit Profile"
                            type="solid"
                        />
                        <View style={{ height: 10, width: 5 }}/>
                        <Button
                            buttonStyle={{ backgroundColor: "blue", width: "50%", alignSelf: "center", padding: 5, paddingTop:3 }}
                            title="Delete Profile"
                            type="solid"
                        />
                    </View>
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
    imageViewStyle: {
        alignContent: "center",
        alignSelf: "center",
        marginTop: 50
    },
    avatarPlaceholder: {
        height: 150,
        width: 150,
        borderRadius: 100,
        backgroundColor: "#E1E2E6",
    },
    userTextStyle: {
        fontSize: 25,
        alignSelf: "center",
        marginTop: 15,
    },

    infoviewStyle: {
        alignContent: "center",
        alignSelf: "center",
        marginTop: 40,
        padding: 10,
        justifyContent: "space-evenly"
    },
    infotextStyle: {
        fontSize: 20,
        justifyContent: "space-evenly",
        padding:5
    }
});

export default ProfileScreen;
