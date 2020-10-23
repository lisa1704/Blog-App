import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
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
                      <TouchableOpacity style={styles.avatarPlaceholder}>
                          <Ionicons
                              name="ios-add"
                              size={40}
                              color="#FFF"
                              style={{ marginTop: 55, alignSelf:"center" }}
                          />
                      </TouchableOpacity>
                  </View>
                  <View>

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
      marginTop:50
    },
    avatarPlaceholder: {
        height: 150,
        width:150,
        borderRadius: 100,
        backgroundColor: "#E1E2E6",
    }
});

export default ProfileScreen;
