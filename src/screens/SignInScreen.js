import React, { useState } from "react";
import { View, StyleSheet, Image, StatusBar, LayoutAnimation } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON } from "../functions/AsyncStorageFunctions";
import { color } from "react-native-reanimated";

const SignInScreen = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <Card style={styles.cardStyle}>
                        <Card.Title style={{ color: "#E9446A" }}>Welcome to Blog App!</Card.Title>
                        <Card.Divider />
                        <Input
                            leftIcon={<FontAwesome name="envelope" size={24} color="#E9446A" />}
                            placeholder="E-mail Address"
                            onChangeText={function (currentInput) {
                                setEmail(currentInput);
                            }}
                        />

                        <Input
                            placeholder="Password"
                            leftIcon={<Feather name="key" size={24} color="#E9446A" />}
                            secureTextEntry={true}
                            onChangeText={function (currentInput) {
                                setPassword(currentInput);
                            }}
                        />


                        <Button
                            buttonStyle={{ backgroundColor: "#E9446A", alignContent: "center", alignItems: "center" }}
                            icon={<AntDesign name="login" size={24} color="#E9446A" />}
                            title="Sign In!"
                            type="solid"
                            onPress={async function () {
                                let UserData = await getDataJSON(Email);
                                if (UserData.password == Password) {
                                    auth.setIsLoggedIn(true);
                                    auth.setCurrentUser(UserData);
                                } else {
                                    alert("Login Failed");
                                    console.log(UserData);
                                }
                            }}
                        />
                        <Button

                            type="clear"
                            icon={<AntDesign name="user" size={24} color="#E9446A" />}
                            title="  Don't have an account?"
                            titleStyle={{ color: "#E9446A" }}
                            onPress={function () {
                                props.navigation.navigate("SignUp");
                            }}
                        />
                    </Card>
                </View>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({

    viewStyle: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    cardStyle: {

    }
});
export default SignInScreen;
