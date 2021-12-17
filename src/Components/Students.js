import React from 'react'

export const Students = ({students}) => {
    return students.map((individualStudent)=>(
        <div className='student' key={individualStudent.ID}>
            <h2>Name: {individualStudent.Name}</h2>
            <h5>Class: {individualStudent.Class}</h5>
            <h5>GPA: {individualStudent.GPA}</h5>
        </div>
    ))
}
