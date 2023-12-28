import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);

  const handleAddTask = () => {
    if (!task) return;
    Keyboard.dismiss();
    setTaskList([...taskList, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    const tasksCopy = [...taskList];
    const completedTasksCopy = [...completedTaskList];
    const taskCompleted = tasksCopy[index];
    tasksCopy.splice(index, 1);
    setTaskList(tasksCopy);
    setCompletedTaskList([...completedTasksCopy, taskCompleted]);
  };

  const handleDeleteTasks = () => {
    setTaskList([])
    setCompletedTaskList([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.mainTitle}>Tarefas de Hoje</Text>
          <View style={styles.deleteWrapper}>
            <TouchableOpacity onPress={() => handleDeleteTasks()}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.items}>
          {taskList.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item}></Task>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tarefas Concluídas</Text>
        <View style={styles.items}>
          {completedTaskList.map((item, index) => {
            return <Task key={index} text={item} completed={true}></Task>;
          })}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.addInput}
          placeholder={"Digite uma nova tarefa"}
          value={task}
          onChangeText={(text) => setTask(text)}
        ></TextInput>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteWrapper: {
    width: 46,
    height: 46,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  deleteButton: {
    fontSize: 20
  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addInput: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 60,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    width: 280,
  },
  addWrapper: {
    width: 54,
    height: 54,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    color: "#595959",
  },
});
