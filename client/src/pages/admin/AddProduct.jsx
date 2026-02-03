/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { FaTimes } from 'react-icons/fa'
import { CiSaveUp2 } from "react-icons/ci"
import Spinner from '../../components/common/Spinner'
import toast from 'react-hot-toast'
import { productServices } from '../../services/productServices'

// Import reusable components
import {
  TextInput,
  NumberInput,
  CurrencyInput,
  TextAreaInput,
  SelectInput,
  CheckboxInput,
  ColorInput,
  FormSection,
  GridTwo,
  ImageUploader,
  InventoryRows,
  AddRowButton,
  HelperText,
  FormHeader,
  LABEL_CLASS,
  INPUT_CLASS
} from '../../components/admin/FormComponents'

// ============================================
// CONSTANTS
// ============================================

const CATEGORY_STRUCTURE = {
  "Formal": ["Oxford", "Derby", "Monk Starp", "Loafers", "Boots"],
  "Casual": ["Sneakers", "Moccasins", "Boat Shoes", "Slip-ons", "Canvas", "Heels"],
  "Sports": ["Running", "Training", "Walking", "Trekking", "Gym"],
  "Outdoor": ["Hiking", "Snow", "Rain", "Adventure"],
  "Sandals & Slippers": ["Slides", "Flip Flops", "Sandals", "Clogs"]
}

const INITIAL_FORM_STATE = {
  name: '',
  slug: '',
  sku: '',
  brand: '',
  description: '',
  cost: '',
  price: '',
  discountPrice: '',
  gender: 'Men',
  category: 'Formal',
  subCategory: '',
  tags: '',
  colorName: '',
  colorHex: '#000000',
  material: '',
  sole: '',
  closure: '',
  weight: '',
  images: [],
  inventory: [{ size: '', stock: '' }],
  lowStockThreshold: 5,
  isActive: true
}

// ============================================
// MAIN COMPONENT
// ============================================

const AddProduct = () => {
  const { globalLoading, setGlobalLoading } = useAppContext()

  // State
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const [isCustomSub, setIsCustomSub] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Refs
  const fileInputRef = useRef(null)

  // ============================================
  // IMAGE HANDLERS
  // ============================================

  const addImage = (files) => {
    const remainingSlots = 4 - formData.images.length

    if (remainingSlots <= 0) {
      toast.error('Maximum 4 images allowed!')
      return
    }

    const allowedFiles = files.slice(0, remainingSlots)
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...allowedFiles]
    }))

    if (files.length > remainingSlots) {
      toast.error(`Only ${remainingSlots} image(s) added`)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    addImage(files)
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(formData.images[index])
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  // ============================================
  // FORM HANDLERS
  // ============================================

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => {
      // Auto-generate slug
      if (name === 'name') {
        return {
          ...prev,
          name: value,
          slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        }
      }

      // Reset subCategory when category changes
      if (name === 'category') {
        return {
          ...prev,
          category: value,
          subCategory: ''
        }
      }

      return { ...prev, [name]: value }
    })

    if (name === 'category') setIsCustomSub(false)
  }

  // ============================================
  // INVENTORY HANDLERS
  // ============================================

  const handleInventoryChange = (index, field, value) => {
    const newInventory = [...formData.inventory]
    newInventory[index][field] = value
    setFormData({ ...formData, inventory: newInventory })
  }

  const addInventoryRow = () => {
    setFormData({
      ...formData,
      inventory: [...formData.inventory, { size: '', stock: '' }]
    })
  }

  const removeInventoryRow = (index) => {
    if (formData.inventory.length > 1) {
      const newInventory = formData.inventory.filter((_, i) => i !== index)
      setFormData({ ...formData, inventory: newInventory })
    } else {
      toast.error('Keep at least one size and stock!')
    }
  }

  // ============================================
  // SUBMIT HANDLER
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault()

    setGlobalLoading(true)
    try {
      const dataToSend = new FormData()

      // Text fields
      dataToSend.append("name", formData.name)
      dataToSend.append("slug", formData.slug)
      dataToSend.append("sku", formData.sku)
      dataToSend.append("brand", formData.brand)
      dataToSend.append("description", formData.description)
      dataToSend.append("cost", formData.cost)
      dataToSend.append("price", formData.price)
      dataToSend.append("discountPrice", formData.discountPrice)
      dataToSend.append("gender", formData.gender)
      dataToSend.append("category", formData.category)
      dataToSend.append("subCategory", formData.subCategory)
      dataToSend.append("tags", formData.tags)
      dataToSend.append("isActive", formData.isActive)
      dataToSend.append("lowStockThreshold", formData.lowStockThreshold)

      // Complex objects as JSON
      dataToSend.append("color", JSON.stringify({
        name: formData.colorName,
        hex: formData.colorHex
      }))

      dataToSend.append("specs", JSON.stringify({
        material: formData.material,
        sole: formData.sole,
        closure: formData.closure,
        weight: formData.weight
      }))

      dataToSend.append("inventory", JSON.stringify(formData.inventory))

      // Images
      formData.images.forEach((file) => {
        dataToSend.append('images', file)
      })

      /*console.log('========= DEBUG FORMDATA ==========');
      for(let [key, value] of dataToSend.entries()) {
        if (value instanceof File) {
            console.log(`${key} : File - ${value.name} (${value.size} bytes)`);
            
        } else {
            console.log(`${key} : ${value}`);
            
        }
      }
      console.log('===================');*/
      
      
      const response = await productServices.addProduct(dataToSend)
      if (response.success) {
        toast.success("Product Added Successfully!")
        //setFormData(INITIAL_FORM_STATE)
      } else {
        toast.error(response.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
        setGlobalLoading(false)
    }
  }

  // ============================================
  // LIFECYCLE
  // ============================================

  useEffect(() => {
    return () => {
      formData.images.forEach(img => URL.revokeObjectURL(img))
    }
  }, [])

  // ============================================
  // RENDER
  // ============================================

  const categoryOptions = Object.keys(CATEGORY_STRUCTURE).map(cat => ({
    value: cat,
    label: cat
  }))

  const genderOptions = [
    { value: 'Men', label: 'Men' },
    { value: 'Women', label: 'Women' },
    { value: 'Unisex', label: 'Unisex' }
  ]

  const subCategoryOptions = CATEGORY_STRUCTURE[formData.category]?.map(sub => ({
    value: sub,
    label: sub
  })) || []

  const estimatedProfit = formData.discountPrice && formData.cost
    ? (formData.discountPrice - formData.cost).toFixed(2)
    : formData.price && formData.cost
      ? (formData.price - formData.cost).toFixed(2)
      : '0.00'

  return (
    <div className='max-w-7xl mx-auto pb-10'>

      {/* Header */}
      <FormHeader
        title="Add New Product"
        subtitle="Create a new item for your inventory"
        actions={
          <>
            <button className='flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors'>
              <FaTimes /> Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={globalLoading}
              className='flex items-center justify-center px-8 py-2.5 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50'
            >
              {globalLoading ? <Spinner /> : (
                <div className='flex items-center gap-2'>
                  <CiSaveUp2 size={24} /> Save
                </div>
              )}
            </button>
          </>
        }
      />

      <form className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

        {/* ===== LEFT COLUMN ===== */}
        <div className='lg:col-span-2 flex flex-col gap-8'>

          {/* General Info */}
          <FormSection title="General Information">
            <div className='space-y-4'>
              <TextInput
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g: Oxford Classic Brown"
                required
              />

              <GridTwo>
                <TextInput
                  label="Slug (URL)"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="oxford-classic-brown"
                  required
                />

                <TextInput
                  label="SKU (Stock Keeping Unit)"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="EST-OXF-BRN-001"
                  required
                />
              </GridTwo>

              <TextAreaInput
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                required
              />

              <TextInput
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g: NIKE"
                required
              />
            </div>
          </FormSection>

          {/* Images */}
          <FormSection title="">
            <ImageUploader
              images={formData.images}
              onAddImages={addImage}
              onRemoveImage={removeImage}
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              fileInputRef={fileInputRef}
            />
          </FormSection>

          {/* Inventory & Specs */}
          <FormSection title="Inventory & Specifications">
            <div>
              <label className={LABEL_CLASS}>Size & Stock</label>
              <InventoryRows
                inventory={formData.inventory}
                onChangeRow={handleInventoryChange}
                onRemoveRow={removeInventoryRow}
              />
              <AddRowButton onAdd={addInventoryRow} />

              <div className='mt-6 border-t border-gray-600 pt-6'>
                <NumberInput
                  label="Low Stock Alert Level"
                  name="lowStockThreshold"
                  value={formData.lowStockThreshold}
                  onChange={handleChange}
                />
                <HelperText text="Dashboard will alert when stock reaches this level." />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-600 pt-6 mt-6'>
                <TextInput
                  label="Material"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="Genuine Leather"
                  required
                />

                <TextInput
                  label="Sole Material"
                  name="sole"
                  value={formData.sole}
                  onChange={handleChange}
                  placeholder="Rubber"
                  required
                />

                <TextInput
                  label="Closure Type"
                  name="closure"
                  value={formData.closure}
                  onChange={handleChange}
                  placeholder="Slip-on"
                  required
                />

                <NumberInput
                  label="Weight (KG)"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="1.2"
                  required
                />
              </div>
            </div>
          </FormSection>

        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className='flex flex-col gap-8'>

          {/* Pricing */}
          <FormSection title="Pricing">
            <div className='space-y-4'>
              <CurrencyInput
                label="Cost per Unit"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="59.99"
                required
              />

              <CurrencyInput
                label="Base Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="99.99"
                required
              />

              <CurrencyInput
                label="Discount Price (Optional)"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="89.99"
              />

              <p className='text-xs text-gray-400 mt-1'>
                Estimated Profit:{' '}
                <span className='text-green-400 font-semibold'>
                  ${estimatedProfit}
                </span>
              </p>
            </div>
          </FormSection>

          {/* Organization */}
          <FormSection title="Organization">
            <div className='space-y-4'>
              <SelectInput
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={genderOptions}
              />

              <SelectInput
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions}
              />

              <div>
                <div className='flex justify-between items-center mb-1'>
                  <label className={LABEL_CLASS}>Sub-Category</label>
                  <button
                    type='button'
                    onClick={() => {
                      setIsCustomSub(!isCustomSub)
                      setFormData(prev => ({ ...prev, subCategory: '' }))
                    }}
                    className='text-sm text-red-500 hover:text-red-400 transition-colors'
                  >
                    {isCustomSub ? "Select from list" : "+ Add New"}
                  </button>
                </div>

                {isCustomSub ? (
                  <TextInput
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    placeholder="Enter new subcategory"
                  />
                ) : (
                  <SelectInput
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    options={subCategoryOptions}
                    required
                  />
                )}
              </div>

              <TextInput
                label="Tags (Separate by Comma)"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="featured, summer, sale"
              />
            </div>

            <CheckboxInput
              id="isActive"
              label="Publish Product Immediately?"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
          </FormSection>

          {/* Color */}
          <FormSection title="Color">
            <ColorInput
              hexValue={formData.colorHex}
              onHexChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
              nameValue={formData.colorName}
              onNameChange={(e) => setFormData({ ...formData, colorName: e.target.value })}
            />
          </FormSection>

        </div>

      </form>

    </div>
  )
}

export default AddProduct