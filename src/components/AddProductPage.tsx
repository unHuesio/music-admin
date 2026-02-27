import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { addProduct } from "../api/products"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NavLink, useNavigate } from "react-router";

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
      <h1 className="text-3xl font-bold underline"><NavLink to="/">Music Admin</NavLink></h1>
      <h2 className="my-4 text-2xl font-bold">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4 max-w-sm mx-auto p-4 border border-gray-300 rounded shadow">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            {...register("name", 
                { required: 'Product name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  maxLength: { value: 25, message: 'Name cannot exceed 25 characters' }
                })} 
            id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="artistName" className="block text-sm font-medium text-gray-700">Artist</label>
          <input {...register("artist", {
             required: 'Artist name is required',
             minLength: { value: 2, message: 'Artist name must be at least 2 characters' },
             maxLength: { value: 25, message: 'Artist name cannot exceed 25 characters' }
              })} id="artistName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          {errors.artist && <p className="text-red-500 text-sm mt-1">{errors.artist.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="coverArtUrl" className="block text-sm font-medium text-gray-700">Cover Art URL</label>
          <input type="file" {...register("coverArt", { required: 'Cover art is required' })} id="coverArtUrl" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          {errors.coverArt && <p className="text-red-500 text-sm mt-1">{errors.coverArt.message}</p>}
        </div>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300" disabled={mutation.isPending}>Add Product</button>
        {mutation.isError && (
          <p className="text-red-500 text-sm mt-2">{mutation.error.message}</p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-600 text-sm mt-2">Product added successfully.</p>
        )}
      </form>
    </div>
  )
}

export default AddProductPage
