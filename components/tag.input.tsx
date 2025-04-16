import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const TagInputComponent = ({tags, setTags}) => {
    const [text, setText] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const addTag = () => {
        if (text.trim() !== '') {
            if (editIndex !== null) {

                // If editing an existing tag
                const newTags = [...tags];
                newTags[editIndex] = text.trim();
                setTags(newTags);
                setEditIndex(null);
            } else {

                // If adding a new tag
                setTags([...tags, text.trim()]);
            }
            setText('');
        }
    };

    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const editTag = (index) => {
        const tagToEdit = tags[index];
        setText(tagToEdit);
        setEditIndex(index);
    };

    return (
        <View style={styles.container}>
            <View style={styles.tagContainer}>
                {tags.map((tag, index) => (
                    console.log(tags),
                    <View key={index} 
                        style={styles.tagWrapper}>
                        <TouchableOpacity 
                            onPress={() => editTag(index)} 
                            style={styles.tag}>
                            <Text style={styles.tagText}>
                                {tag}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => removeTag(index)}
                            style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>
                                X
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ajouter des mots clé"
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={addTag}
                />
                <TouchableOpacity onPress={addTag} 
                    style={styles.addButton}>
                    <Text style={styles.buttonText}>
                        {editIndex !== null ? 'Update' : 'Ajouter'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const tagInput = () => {
    return (
        <View style={styles.appContainer}>
            <TagInputComponent />
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    container: {
        minWidth: '100%',
        width: '100%',
        paddingHorizontal: 20,

    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    tagWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginRight: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#ccc'
    },
    tag: {
        backgroundColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    tagText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 12,
    },
    removeButton: {
        marginLeft: 5,
        paddingHorizontal: 5,
        borderRadius: 3,
        backgroundColor: '#E53935',
    },
    removeButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#FFFFFF',
        color:"#aaa",
        fontWeight: 'bold',
        width: '100%',
        minWidth: "80%",
        fontSize: 10,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        minWidth: "20%"
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TagInputComponent;
