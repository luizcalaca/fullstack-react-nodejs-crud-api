import React, { Component } from 'react';
import qs from 'querystring';

import api from '../services/api';

import UserTable from '../components/table/UserTable';
import AddUserForm from '../components/forms/AddUserForm';
import EditUserForm from '../components/forms/EditUserForm';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            currentUser: { _id: null, name: '', username: '' },
            editing: false
        }
    }

    componentDidMount() {
        this.refreshUserTable();
    }

    refreshUserTable() {
        this.usersData = api.get('user')
            .then(response => response.data)
            .then(data => {

                this.setState({ 
                    users: data.people,
                    setUsers: data.people
                });
            });
    }

    addUser = user => {

        api.post('user', qs.stringify(user))
            .then(res => {
                this.refreshUserTable();
            });
    };

    deleteUser = id => {

        api.delete(`user/${id}`)
            .then(res => {
                this.refreshUserTable();
            });
    };

    updateUser = (id, user) => {
        
        api.put(`user/${id}`, qs.stringify(user))
            .then(res => {

                this.refreshUserTable();
            });
        
        this.setState({ 
            currentUser: { _id: null, name: '', username: '' }
        });

        this.setEditing(false);
    };

    editRow = user => {

        this.setState({ 
            currentUser: { _id: user._id, name: user.name, username: user.username }
        });

        this.setEditing(true);
    };

    setEditing = isEditing => {

        this.setState({ editing: isEditing });
    };

    render () {
        const { users } = this.state;

        return (
            <div className="container">
                    
                <div className="row">
    
                    {
                        this.state.editing ? (
                            <div className="col s12 l6">
                                <h4>Edit User</h4>
                                <EditUserForm 
                                    editing={this.state.editing}
                                    setEditing={this.setEditing}
                                    currentUser={this.state.currentUser}
                                    updateUser={this.updateUser} 
                                />
                            </div>
                        ) : (
                            <div className="col s12 l6">
                                <h4>Add user</h4>
                                <AddUserForm addUser={this.addUser} />
                            </div>
                        )
                    }
                    
                    <div className="col s12 l6">
                        <h5>Users</h5>
                        <UserTable users={users} editRow={this.editRow} deleteUser={this.deleteUser} />
                    </div>
                </div>
            </div>
        );
    };
};

export default Home;