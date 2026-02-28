import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { addProduct } from "../api/products"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NavLink, useNavigate } from "react-router";
import './AddProductPage.css'

interface IFormData {
    name: string;
    artist: string;
    coverArt: FileList;
}

function AddProductPage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormData>()
    const mutation = useMutation({
      mutationFn: addProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        reset();
        navigate('/');
      },
    });

    const onSubmit: SubmitHandler<IFormData> = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("artistName", data.artist);
        formData.append("coverArtUrl", data.coverArt[0]);
        mutation.mutate(formData);
    }
  return (
    <div>
      <h1 className="header"><NavLink to="/">Music Admin</NavLink></h1>
      <h2 className="subheader">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input-wrapper">
          <label htmlFor="name" className="label">Name</label>
          <input 
            {...register("name", 
                { required: 'Product name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  maxLength: { value: 25, message: 'Name cannot exceed 25 characters' }
                })} 
            id="name" className="input" disabled={mutation.isPending} />
          {errors.name && <p className="input-error">{errors.name.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="artistName" className="label">Artist</label>
          <input {...register("artist", {
             required: 'Artist name is required',
             minLength: { value: 2, message: 'Artist name must be at least 2 characters' },
             maxLength: { value: 25, message: 'Artist name cannot exceed 25 characters' }
              })} id="artistName" className="input" disabled={mutation.isPending} />
          {errors.artist && <p className="input-error">{errors.artist.message}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="coverArtUrl" className="label">Cover Art Image</label>
          <input type="file" {...register("coverArt", { required: 'Cover art is required' })} id="coverArtUrl" className="input" disabled={mutation.isPending} />
          {errors.coverArt && <p className="input-error">{errors.coverArt.message}</p>}
        </div>
        <button type="submit" className="add-button" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting...' : 'Add Product'}
        </button>
        {mutation.isError && (
          <p className="input-error">{mutation.error.message}</p>
        )}
        {mutation.isSuccess && (
          <p className="success-message">Product added successfully.</p>
        )}
      </form>
    </div>
  )
}

export default AddProductPage
