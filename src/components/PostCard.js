import React from "react";
import { View} from "react-native";
import { Card, Button, Text, Avatar} from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { storeData, storeDataJSON, getData, getDataJSON, removeData, mergeData } from "./../functions/AsyncStorageFunctions";

const PostCard = (props) => {
    const [Like, setLike] = useState(<AntDesign name="like2" size={24} color="dodgerblue" />);
    const ChangeLikeIcon = () => {
        return (<Button
            title="Like"
            type="outline"
            icon={<AntDesign name="like1" size={24} color="black" />}
        />
        );
    };
    return (
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
                    {props.name}
                </Text>
            </View>
            <Text style={{ fontStyle: "italic" }}> Posted on {props.date}</Text>
            <Text style={{ fontStyle: "italic" }}> {props.title}</Text>
            <Text
                style={{
                    paddingVertical: 10,
                }}
            >
                {props.post}
            </Text>
            <Card.Divider />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Button
                    type="outline"
                    title="Like"
                    icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
                    onPress={function () {
                        setLike(ChangeLikeIcon());
                    }}
                
                    

                />
                <Button type="solid" title="Comment" />
            </View>
        </Card>
    );
};

export default PostCard;
