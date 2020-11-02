import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { removeData } from "../functions/AsyncStorageFunctions";
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
                    <View style={styles.avatarPlaceholder}>
                        <Avatar
                            rounded
                            activeOpacity={0.7}
                            size="xlarge"
                            source={{
                                uri:
                                    'https://scontent.fdac37-1.fna.fbcdn.net/v/t1.0-9/41871769_2115253698802769_1077357610937614336_n.jpg?_nc_cat=106&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeEJMk41YbLcJG-oNJ0r8UHYamkAvE2UaotqaQC8TZRqi9vYaszKI9h0qy9qveAqGVQJoUDjBFHDoIJroP79txpo&_nc_ohc=YEy21tChJhoAX9pd-8u&_nc_ht=scontent.fdac37-1.fna&oh=3d60f86dcff46e59bc887f8d33a480a9&oe=5FC63D69',
                            }}
                        />
                        <Text style={styles.userTextStyle}>{auth.CurrentUser.name}</Text>
                    </View>
                    <Button
                        buttonStyle={{ width: "40%", alignSelf: "center", padding:10 }}
                        title="Delete Profile"
                        type="solid"
                        onLongPress={
                            async function () {
                                await removeData(auth.CurrentUser.email);
                                alert("Profile has been removed");
                                auth.setCurrentUser({});
                                auth.setIsLoggedIn(false);
                            }
                        }
                    />
                    <Text style={ styles.space}></Text>
                    <Card style={styles.infoviewStyle}>
                        <Text style={styles.infotextStyle}>Student ID: {auth.CurrentUser.sid} </Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.infotextStyle}>E-mail: {auth.CurrentUser.email} </Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.infotextStyle}>Born on: {auth.CurrentUser.dateofbirth} </Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.infotextStyle}>Address: {auth.CurrentUser.address} </Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.infotextStyle}>Works At: {auth.CurrentUser.workplace} </Text>
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
    avatarPlaceholder: {
        alignContent: "center",
        alignSelf: "center",
        marginTop: 50
    },
    userTextStyle: {
        fontWeight:"bold",
        fontSize: 25,
        alignSelf: "center",
        marginTop: 15,
        marginBottom:10
    },

    infoviewStyle: {
        alignContent: "center",
        alignSelf: "center",
        marginTop: 100,
        marginBottom:100,
        padding: 100,
        justifyContent: "space-evenly"
    },
    infotextStyle: {
        fontSize: 20,
        justifyContent: "space-evenly",
        padding: 5,
    },
    space: {
        height:10
    }
});

export default ProfileScreen;
