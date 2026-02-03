import React from 'react'
import { FaTimes, FaCloudUploadAlt, FaPlus, FaTrash } from 'react-icons/fa'

// ============================================
// CSS CLASSES
// ============================================

export const INPUT_CLASS = "w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-red-100 focus:border-red-500 focus:shadow focus:shadow-red-500 block p-2.5 placeholder-gray-400 outline-none"

export const LABEL_CLASS = "block mb-2 text-sm font-medium text-gray-300"

export const SECTION_CLASS = "bg-linear-180 from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-600 shadow-lg border-l-3 border-l-red-500"

export const SECTION_TITLE_CLASS = "text-lg font-semibold text-gray-300 mb-4 border-l-4 border-red-500 pl-3"

// ============================================
// FORM INPUT COMPONENTS
// ============================================

/**
 * Text Input Field
 * @param {string} label - Field label
 * @param {string} name - Input name
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Is required
 */
export const TextInput = ({ label, name, value, onChange, placeholder, required = false }) => (
  <div>
    <label className={LABEL_CLASS}>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={INPUT_CLASS}
      placeholder={placeholder}
      required={required}
    />
  </div>
)

/**
 * Number Input Field
 * @param {string} label - Field label
 * @param {string} name - Input name
 * @param {number} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Is required
 */
export const NumberInput = ({ label, name, value, onChange, placeholder, required = false }) => (
  <div>
    <label className={LABEL_CLASS}>{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      className={INPUT_CLASS}
      placeholder={placeholder}
      required={required}
    />
  </div>
)

/**
 * Currency Input Field with $ prefix
 * @param {string} label - Field label
 * @param {string} name - Input name
 * @param {number} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Is required
 */
export const CurrencyInput = ({ label, name, value, onChange, placeholder, required = false }) => (
  <div>
    <label className={LABEL_CLASS}>{label}</label>
    <div className='relative'>
      <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>$</span>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className={`${INPUT_CLASS} pl-7`}
        placeholder={placeholder}
        required={required}
      />
    </div>
  </div>
)

/**
 * Textarea Field
 * @param {string} label - Field label
 * @param {string} name - Input name
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {number} rows - Number of rows
 * @param {boolean} required - Is required
 */
export const TextAreaInput = ({ label, name, value, onChange, placeholder, rows = 4, required = false }) => (
  <div>
    <label className={LABEL_CLASS}>{label}</label>
    <textarea
      rows={rows}
      name={name}
      value={value}
      onChange={onChange}
      className={INPUT_CLASS}
      placeholder={placeholder}
      required={required}
    />
  </div>
)

/**
 * Select Dropdown Field
 * @param {string} label - Field label
 * @param {string} name - Input name
 * @param {string} value - Selected value
 * @param {function} onChange - Change handler
 * @param {array} options - [{value: '', label: ''}]
 * @param {boolean} required - Is required
 */
export const SelectInput = ({ label, name, value, onChange, options, required = false }) => (
  <div>
    <label className={LABEL_CLASS}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={INPUT_CLASS}
      required={required}
    >
      <option value="" disabled>Select Option</option>
      {options.map((opt) => (
        <option value={opt.value} key={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

/**
 * Checkbox Field
 * @param {string} id - Input id
 * @param {string} label - Field label
 * @param {boolean} checked - Is checked
 * @param {function} onChange - Change handler
 */
export const CheckboxInput = ({ id, label, checked, onChange }) => (
  <div className='flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600'>
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 text-red-600 accent-red-500 bg-gray-700 border-gray-500 rounded focus:ring-red-500 focus:ring-2"
    />
    <label htmlFor={id} className="text-sm font-medium text-gray-200 cursor-pointer select-none">
      {label}
    </label>
  </div>
)

/**
 * Color Input Field (color picker + text)
 * @param {string} hexValue - Hex color value
 * @param {function} onHexChange - Hex change handler
 * @param {string} nameValue - Color name value
 * @param {function} onNameChange - Name change handler
 */
export const ColorInput = ({ hexValue, onHexChange, nameValue, onNameChange }) => (
  <div className='flex gap-4 items-center'>
    <input
      type='color'
      value={hexValue}
      onChange={onHexChange}
      className='w-15 h-12 p-0 rounded-lg cursor-pointer bg-transparent'
    />
    <input
      type="text"
      value={nameValue}
      onChange={onNameChange}
      className={INPUT_CLASS}
      placeholder="Color Name (e.g. Brown)"
    />
  </div>
)

// ============================================
// SECTION COMPONENTS
// ============================================

/**
 * Form Section Wrapper
 * @param {string} title - Section title
 * @param {React.ReactNode} children - Section content
 */
export const FormSection = ({ title, children }) => (
  <section className={SECTION_CLASS}>
    <h3 className={SECTION_TITLE_CLASS}>{title}</h3>
    {children}
  </section>
)

/**
 * Two Column Grid Layout
 * @param {React.ReactNode} children - Grid items
 */
export const GridTwo = ({ children }) => (
  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
    {children}
  </div>
)

// ============================================
// IMAGE UPLOAD COMPONENT
// ============================================

/**
 * Image Upload with Drag & Drop
 * @param {File[]} images - Array of image files
 * @param {function} onAddImages - Handler to add images
 * @param {function} onRemoveImage - Handler to remove image
 * @param {boolean} isDragging - Is user dragging over
 * @param {function} onDragOver - Drag over handler
 * @param {function} onDragLeave - Drag leave handler
 * @param {function} onDrop - Drop handler
 * @param {React.Ref} fileInputRef - File input ref
 */
export const ImageUploader = ({
  images,
  onAddImages,
  onRemoveImage,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  fileInputRef
}) => (
  <div>
    <label className={`${LABEL_CLASS}`}>Product Images (Max 4)</label>

    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-4'>
      {/* Display uploaded images */}
      {images.map((img, i) => (
        <div key={i} className='relative aspect-square rounded-lg overflow-hidden border border-gray-600 group'>
          <img
            src={URL.createObjectURL(img)}
            alt={`Product ${i + 1}`}
            className='w-full h-full object-cover'
          />
          <button
            type='button'
            onClick={() => onRemoveImage(i)}
            className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
          >
            <FaTimes size={14} />
          </button>
        </div>
      ))}

      {/* Upload box - show only if less than 4 images */}
      {images.length < 4 && (
        <label
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${isDragging ? 'border-red-500 bg-red-500/10' : 'border-gray-600 hover:border-red-500 hover:bg-gray-700/50'}`}
        >
          <FaCloudUploadAlt className='text-3xl text-gray-400 mb-2' />
          <span className='text-xs text-gray-400 font-medium'>Upload Image</span>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            className='hidden'
            onChange={(e) => onAddImages(Array.from(e.target.files))}
          />
        </label>
      )}
    </div>
  </div>
)

// ============================================
// INVENTORY COMPONENT
// ============================================

/**
 * Inventory Table Rows
 * @param {array} inventory - [{size: '', stock: ''}]
 * @param {function} onChangeRow - Handler to change row
 * @param {function} onRemoveRow - Handler to remove row
 */
export const InventoryRows = ({ inventory, onChangeRow, onRemoveRow }) => (
  <div className='space-y-3'>
    {inventory.map((item, index) => (
      <div key={index} className='flex gap-4 items-center'>
        <input
          type="text"
          placeholder='Size (e.g. 7)'
          value={item.size}
          onChange={(e) => onChangeRow(index, 'size', e.target.value)}
          className={INPUT_CLASS}
          required
        />

        <input
          type="number"
          placeholder='Stock Qty'
          value={item.stock}
          onChange={(e) => onChangeRow(index, 'stock', e.target.value)}
          className={INPUT_CLASS}
          required
        />

        <button
          type='button'
          onClick={() => onRemoveRow(index)}
          className='p-2 rounded-lg flex items-center justify-center bg-red-500/40 text-gray-400 hover:text-red-500 transition-all'
        >
          <FaTrash size={20} />
        </button>
      </div>
    ))}
  </div>
)

/**
 * Add Row Button
 * @param {function} onAdd - Handler to add row
 * @param {string} text - Button text
 */
export const AddRowButton = ({ onAdd, text = "Add Another Size" }) => (
  <button
    type='button'
    onClick={onAdd}
    className='mt-3 text-sm md:text-base text-red-500 hover:text-red-400 flex items-center gap-1 font-medium'
  >
    <FaPlus /> {text}
  </button>
)

// ============================================
// HELPER COMPONENTS
// ============================================

/**
 * Helper Text
 * @param {string} text - Helper text
 */
export const HelperText = ({ text }) => (
  <p className='text-xs text-gray-500 mt-1'>{text}</p>
)

/**
 * Form Header
 * @param {string} title - Main title
 * @param {string} subtitle - Subtitle
 * @param {React.ReactNode} actions - Action buttons
 */
export const FormHeader = ({ title, subtitle, actions }) => (
  <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
    <div>
      <h1 className='text-4xl font-semibold font-Zalando text-red-500 tracking-tight'>
        {title}
      </h1>
      <p className='text-gray-400 mt-1'>{subtitle}</p>
    </div>
    <div className='flex gap-3'>
      {actions}
    </div>
  </div>
)