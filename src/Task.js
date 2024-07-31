import { useState } from "react";
import { StyleSheet, View, Text, Dimensions, TextInput, Pressable, Keyboard, FlatList } from "react-native"

const { width, height } = Dimensions.get("window");
const SIZE = Math.min(width, height);


export const Task = () => {

    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const addTask = () => {
        Keyboard.dismiss();
        if (task !== null) {
            setTaskItems([...taskItems, task]);
            setTask(null);
        }
    }

    const completeTask = (index) => {
        let items = [...taskItems];
        items.splice(index, 1);
        setTaskItems(items);
    }

    return (
        <View style={styles.container} >
            <View style={styles.titleArea} >
                <Text style={styles.titleStyle} >Today's Tasks</Text>
            </View>

            <View style={{ flex: 5, alignItems: "center"}} >

                {
                    <FlatList 
                    style={{width:"100%"}}
                    data={taskItems}
                    renderItem={({item,index}) => (
                        <View style={styles.taskBar} >
                                <View style={{ flex: 1 }} >
                                    <Pressable key={index} onPress={() => completeTask(index)}>
                                        <View style={styles.checkBox} >

                                        </View>
                                    </Pressable>
                                </View>

                                <View style={{ flex: 6 }} >
                                    <Text key={index}>{item}</Text>
                                </View>
                            </View>
                    )}
                    keyExtractor={(item,index) => index.toString()}
                    contentContainerStyle={{ alignItems: 'center' }}
                    />
                }
            </View>

            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: SIZE / 15 }} >
                <View style={{ flex: 3, height: "100%", justifyContent: "center" }} >
                    <TextInput style={styles.textTask} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
                </View>

                <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }} >
                    <Pressable onPress={() => addTask()} >
                        <View style={styles.addTaskButton} >
                            <Text style={{ fontSize: SIZE / 20, color: "#C6C6C6" }} >+</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#DEDEDE"
    },
    titleArea: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: SIZE / 15,
    },
    titleStyle: {
        fontSize: SIZE / 20,
        fontWeight: "600"
    },
    taskBar: {
        width: "90%",
        height: SIZE / 10,
        backgroundColor: "#fff",
        marginVertical: SIZE / 75,
        borderRadius: 1000,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SIZE / 20
    },
    checkBox: {
        width: SIZE / 20,
        height: SIZE / 20,
        backgroundColor: "#B3E0FA",
        borderRadius: 5
    },
    textTask: {
        width: "100%",
        height: "50%",
        backgroundColor: "#fff",
        borderRadius: 1000,
        paddingLeft: SIZE / 4.5
    },
    addTaskButton: {
        width: SIZE / 7,
        height: SIZE / 7,
        borderRadius: 1000,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    }
})