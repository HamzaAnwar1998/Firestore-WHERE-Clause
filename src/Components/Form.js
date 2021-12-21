import React,{useState} from 'react'
import { Products } from './Products';

// import firebase/app
import 'firebase/app'

// we need to import firebase/firestore
import 'firebase/firestore';

//import neccessary tools from firebase/firestore
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

// import initializeApp to initialize app
import {initializeApp} from 'firebase/app';
import { Students } from './Students';

// initialize app with you project credentials
const firebaseApp= initializeApp({
    apiKey: "AIzaSyDq_WRJbnZtWnSxqbV_kl-ZZS8DVnhy6wg",
    authDomain: "ecommerce-app-with-react-hooks.firebaseapp.com",
    projectId: "ecommerce-app-with-react-hooks",
    storageBucket: "ecommerce-app-with-react-hooks.appspot.com",
    messagingSenderId: "719037100374",
    appId: "1:719037100374:web:6c6091a610ce02b3a766f7",
    measurementId: "G-ZN4GN3FPP7"
}) 

export const Form = () => {

    // collection state
    const [myCollection, setMyCollection]=useState('');

    // products state
    const [category, setCategory]=useState('');
    const [priceRange, setPriceRange]=useState('');

    // states for students
    const [myClass, setMyClass]=useState('');
    const [gpa, setGpa]=useState('');

    // fetched products
    const[products, setProducts]=useState([]);
    // console.log(products);

    // fetched students
    const [students, setStudents]=useState([]);
    // console.log(students);

    const [errorMsg, setErrorMsg]=useState('');

    // my collection onChange event
    const handleMyCollection=(e)=>{
        setMyCollection(e.target.value);
        setErrorMsg('');
        setMyClass('');
        setGpa('');
        setCategory('');
        setPriceRange('');
        setProducts([]);
        setStudents([]);
    }

    // handle category
    const handleCategory=(e)=>{
        setCategory(e.target.value);
        setErrorMsg('');
        setProducts([]);
    }

    // handle price range
    const handlePriceRange=(e)=>{
        setPriceRange(e.target.value);
        setErrorMsg('');
        setProducts([]);
    }

    // handle class
    const handleClass=(e)=>{
        setMyClass(e.target.value);
        setErrorMsg('');
        setStudents([]);
    }

    // handle gpa range
    const handleGpa=(e)=>{
        setGpa(e.target.value);
        setErrorMsg('');
        setStudents([]);
    }

    // submit event
    const fetchData= async(e)=>{
        e.preventDefault();
        // console.log(myCollection,category,priceRange);

        // get firestoreproject
        const fs = getFirestore(firebaseApp);

        // create a collection reference
        const collectionRef = collection(fs,myCollection);

        // if user selects Products
        if(myCollection==='Products'){
            let q;
            // create a query if we have price range < 500
            if(priceRange === 'less than $500'){
                q = query(collectionRef,where('category','==',category)
                ,where('price','<',500));
            }
            // create a query if we have price range 500 - 1000
            else if(priceRange === '$500 - $1000'){
                q = query(collectionRef,where('category','==',category)
                ,where('price','>=',500), where('price','<=',1000));
            }
            // create a query if we have price range 1001 - 5000
            else if(priceRange === '$1001 - $5000'){
                q = query(collectionRef,where('category','==',category)
                ,where('price','>',1000), where('price','<=',5000));
            }
            // create a query if we have price range 5001 - 10000
            else if(priceRange === '$5001 - $10000'){
                q = query(collectionRef,where('category','==',category)
                ,where('price','>',5000), where('price','<=',10000));
            }
            // create a query if we have price > 10000
            else if(priceRange === 'greater than $10000'){
                q = query(collectionRef,where('category','==',category)
                ,where('price','>',10000));
            }
            const products = await getDocs(q);
            if(products.docs.length > 0){
                setErrorMsg('');
                var productsArray=[];
                for (var snap of products.docs){
                    var data = snap.data();
                    data.ID = snap.id;
                    productsArray.push({...data});
                }
                if(productsArray.length === products.docs.length){
                    setProducts(productsArray);
                }
            }
            else{
                setProducts([]);
                setErrorMsg('No Products Found');
            }
        }
        // if user selects Students
        else if (myCollection==='Students'){
            let qForStudents;
            // create a query if we have gpa less than 2.50
            if(gpa==='less than 2.50'){
                qForStudents=query(collectionRef,where('Class','==',myClass),
                where('GPA','<',2.50))
            }
            // create a query if we have gpa 2.50 - 3.00
            else if(gpa==='2.50 - 3.00'){
                qForStudents=query(collectionRef,where('Class','==',myClass),
                where('GPA','>=',2.50), where('GPA','<=',3.00))
            }
            // create a query if we have gpa 3.01 - 3.50
            else if(gpa==='3.01 - 3.50'){
                qForStudents=query(collectionRef,where('Class','==',myClass),
                where('GPA','>',3.00), where('GPA','<=',3.50))
            }
            // create a query if we have gpa > 3.50
            else if(gpa==='greater than 3.50'){
                qForStudents=query(collectionRef,where('Class','==',myClass),
                where('GPA','>',3.50))
            }
            const students = await getDocs(qForStudents);
            if(students.docs.length > 0){
                setErrorMsg('');
                var studentsArray=[];
                for (var studentsSnap of students.docs){
                    var studentData = studentsSnap.data();
                    studentData.ID = studentsSnap.id;
                    studentsArray.push({...studentData})
                }
                if(studentsArray.length===students.docs.length){
                    setStudents(studentsArray);
                }
            }
            else{
                setErrorMsg('No Student Record Found');
                setStudents([]);
            }
        }
    }

    return (
        <>
            <form className='form-group' onSubmit={fetchData}>
                <h3>Request your data using this form</h3>
                <label>Which collection do you want to fetch?</label>
                <select className='form-control' required
                value={myCollection} onChange={handleMyCollection}>
                    <option value="">Select preferred collection</option>
                    <option>Products</option>
                    <option>Students</option>
                </select>

                {myCollection==='Products'&&(
                    <>
                        <br></br>
                        <label>Which category of products do you want to see?</label>
                        <select className='form-control' required
                        value={category} onChange={handleCategory}>
                            <option value="">Select Product Category</option>
                            <option>Electronic Devices</option>
                            <option>Mobile Accessories</option>
                            <option>Home & Lifestyle</option>
                            <option>Health & Beauty</option>
                        </select>
                        <br></br>
                        <label>What is your price range?</label>
                        <select className='form-control' required
                        value={priceRange} onChange={handlePriceRange}>
                            <option value="">Select Products Price Range</option>
                            <option>less than $500</option>
                            <option>$500 - $1000</option>
                            <option>$1001 - $5000</option>
                            <option>$5001 - $10000</option>
                            <option>greater than $10000</option>
                        </select>
                        <br></br>
                        <button type='submit' className='btn btn-warning btn-md fetch-btn'>
                            FETCH
                        </button>
                    </>
                )}
                {myCollection==='Students'&&(
                    <>
                        <br></br>
                        <label>Which class of students do you want to see?</label>
                        <select className='form-control' required
                        value={myClass} onChange={handleClass}>
                            <option value="">Select Class</option>
                            <option>1st year</option>
                            <option>2nd year</option>
                            <option>3rd year</option>
                            <option>4th year</option>
                        </select>
                        <br></br>
                        <label>See Students according to their GPA</label>
                        <select className='form-control' required
                        value={gpa} onChange={handleGpa}>
                            <option value="">Select GPA range</option>
                            <option>less than 2.50</option>
                            <option>2.50 - 3.00</option>
                            <option>3.01 - 3.50</option>
                            <option>greater than 3.50</option>
                        </select>
                        <br></br>
                        <button type='submit' className='btn btn-warning btn-md fetch-btn'>
                            FETCH
                        </button>
                    </>
                )}
            </form>

            {myCollection===''&&(
                <div className='msg-box'>
                    Fetch your collection to be displayed here
                </div>
            )}

            {myCollection==='Products'&&(
                <>
                    {products.length > 0&&(
                        <>
                            <br></br>
                            <h3 className='text-center'>
                                The data is fetched from {myCollection} with category {category} and the price range is {priceRange}
                            </h3>
                            <div className='products-box'>
                                <Products products={products}/>
                            </div>
                        </>
                    )}
                    {products.length < 1 &&(
                        <>
                            {errorMsg&&<div className='msg-box'>{errorMsg}</div>}
                        </>
                    )}
                </>
            )}
            {myCollection==='Students'&&(
                <>
                    {students.length > 0&&(
                        <>
                            <br></br>
                            <h3 className='text-center'>
                                The data is fetched from {myCollection} for class {myClass} and their GPA range is {gpa}
                            </h3>
                            <div className='products-box'>
                                <Students students={students}/>
                            </div>
                        </>
                    )}
                    {students.length < 1 &&(
                        <>
                            {errorMsg&&<div className='msg-box'>{errorMsg}</div>}
                        </>
                    )}
                </>
            )}
        </>
    )
}