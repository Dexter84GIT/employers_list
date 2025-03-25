import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Nick', salary: 5500, increase: true, rise: true, id: 1},
                {name: 'Dexter Holland', salary: 1000, increase: false, rise: false, id: 2},
                {name: 'Matt Bellamy', salary: 3000, increase: false, rise: false, id: 3},
                {name: 'Ryan Raynolds', salary: 2000, increase: false, rise: false, id: 4},
            ],
            term: '',
            filter: 'all'
        };
        this.maxId = 5;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name: name,
            salary: salary,
            increase: false,
            rise: false,
            id: this.maxId++
        };
        this.setState(({data}) => ({
            data: [...data, newItem],
        }))
    }

    onToggleIncrease = (id) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);
            
        //     const old = data[index];
        //     // раскрываем old и меняем свойство, записывая его в new
        //     const newItem = {...old, increase: !old.increase};
        //     const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

        //     return {
        //         data: newArray
        //     }
        // })
        this.setState(({data}) => ({
            // создаём дубликат массива с данными
            data: data.map(item => {
                // если id совпадают
                if (item.id === id) {
                    // возвращаем новый массив с измененным свойством increase
                    // ...item наследует все пропсы item
                    return {...item, increase: !item.increase}
                }
                // возвращаем item с измененным значением
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            // создаём дубликат массива с данными
            data: data.map(item => {
                // если id совпадают
                if (item.id === id) {
                    // возвращаем новый массив с измененным свойством increase
                    // ...item наследует все пропсы item
                    return {...item, rise: !item.rise}
                }
                // возвращаем item с измененным значением
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        // если строка пустая просто возвращаем весь массив
        if (term.length === 0) {
            return items;
        } 
        // отфильтровываем данные и методом indexOf сравниваем data и содержимое строки поиска
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000': 
                return items.filter(item => item.salary > 1000);
            default: 
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter)

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
    
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}/>
                <EmployersAddForm onAddItem={this.addItem} />
            </div>
        );
    }
}

export default App;