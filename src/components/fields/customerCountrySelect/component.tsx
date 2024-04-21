import * as React from 'react'
import { SelectInput, useField, useWatchForm } from 'payload/components/forms'
import { useEffect, useState } from 'react'

export const CustomCountryComponent = ({ path, label }) => {
  const { value, setValue } = useField<string>({ path })
  const [options, setOptions] = useState([])

  const { getDataByPath } = useWatchForm()
  const stateId = getDataByPath('stateId')
  const fetchOptions = async url => {
    try {
      const response = await fetch(url)
      const data = await response.json()

      const countryOptions = [data].map(country => {
        return {
          label: `${country.countryId.name}`,
          value: country.countryId.id,
        }
      })
      setValue(data.countryId.id)
      setOptions(countryOptions.sort((a, b) => a.label.localeCompare(b.label)))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    let url = `http://localhost:3000/api/state/${stateId}`
    if (stateId) {
      fetchOptions(url)
    }
  }, [stateId])
  return (
    <div className="field-type">
      <label className="field-label">{label}</label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={e => setValue(e.value)}
      />
    </div>
  )
}
