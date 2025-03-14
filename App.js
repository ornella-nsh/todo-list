import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import { useFonts } from "expo-font";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: "1", description: "clean litter box", completed: false },
    { id: "2", description: "buy groceries", completed: false },
    { id: "3", description: "finish homework", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  //add a new task to the list
  const addTask = () => {
    "";
    //check if the input is empty
    if (newTask.trim() !== "") {
      setTasks([
        //make a new array with the new task added
        ...tasks,
        { id: Date.now().toString(), description: newTask, completed: false },
      ]);
      setNewTask(""); //clear input after new task is added
    }
  };

  //logic to toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //define how each task is displayed
  //Checkbox does not accept a style prop, so need to use containerStyle
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <CheckBox
        containerStyle={styles.checkboxContainer}
        checkedColor="#000"
        uncheckedColor="#000"
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.id)}
      />
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.description}
      </Text>
    </View>
  );

  const [fontsLoaded] = useFonts({
    CallingCode: require("./assets/CallingCode-Regular.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  //SafeAreaView to make sure content isn't hidden by status bar
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={newTask}
        onChangeText={setNewTask}
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
    paddingHorizontal: 5,
    fontFamily: "CallingCode",
    alignItems: "center",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
    margin: 8,
    backgroundColor: "#FFE562",
    borderRadius: 14,
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: "CallingCode",
    borderColor: "#000",
  },
  checkboxContainer: {
    backgroundColor: "#ffe562",
    padding: 0,
    margin: 0,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "gray",
  },
  input: {
    padding: 10,
    fontSize: 18,
    margin: 8,
    backgroundColor: "#D8D8D8",
    borderRadius: 14,
    fontFamily: "CallingCode",
  },
  button: {
    color: "#000",
    backgroundColor: "#000",
    width: "25%",
    padding: 10,
    alignItems: "center",
    borderRadius: 14,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CallingCode",
  },
  flatList: {
    marginTop: 10,
  },
});
