// import { useState } from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   // FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Icons } from "@/components/ui/icons";
// import { Input } from "@/components/ui/input";

// const quantitySchema = z.object({
//   quantity: z.number().min(0).default(1),
// });

// export default function AddToCartForm() {

//   const form = useForm<z.infer<typeof quantitySchema>>({
//     resolver: zodResolver(quantitySchema),
//     defaultValues: {
//       quantity: 1,
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof quantitySchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//     toast.success("Product is added to cart successfully")
   
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="grid w-full pr-8 lg:pr-0"
//         autoComplete="off"
//       >
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem className="relative space-y-0">
//               <FormLabel className="sr-only">Email</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="input your email"
//                   {...field}
//                   className="pr-12"
//                 />
//               </FormControl>
//               <Button
//                 size="icon"
//                 className="absolute top-[4px] right-[3.5px] size-7 z-20"
//               >
//                 {loading ? (
//                   <Loader2Icon className="animate-spin" />
//                 ) : (
//                   <Icons.PaperPlane className="size-3" aria-hidden="true" />
//                 )}

//                 <span className="sr-only">Join NewsLetter</span>
//               </Button>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </form>
//     </Form>
//   );
// }
