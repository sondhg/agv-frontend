"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { postCreateAGV } from "../../../../../services/apiServices";
import { agvIDs, guidanceTypes } from "../../../../../utils/arraysUsedOften";

const formSchema = z.object({
  agv_id: z.number().min(1).max(4),
  max_speed: z.string().min(1).max(2),
  max_battery: z.string().min(1).max(3),
  max_load: z.string().min(1).max(2),
  guidance_type: z.string(),
});

export function FormAGVs(props) {
  const { fetchListAGVs } = props;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agv_id: 1,
      max_speed: "30",
      max_battery: "100",
      max_load: "20",
      guidance_type: "Line Following",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Call the postCreateAGV function and pass the form values
    const res = await postCreateAGV(values);
    if (res && !res.error) {
      console.log("Added AGV:", res);
      toast.success("Added AGV to team!");
      await fetchListAGVs();
    } else {
      console.error("Failed to add AGV:", res.error);
      toast.error(res.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <FormField
            control={form.control}
            name="agv_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AGV ID</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an AGV ID" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {agvIDs.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select AGV ID</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guidance_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guidance type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a guidance type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {guidanceTypes.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select guidance type</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_battery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max battery</FormLabel>
                <FormControl>
                  <Input placeholder="Enter number from 1 to 100" {...field} />
                </FormControl>
                <FormDescription>Enter max battery capacity</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_load"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max load</FormLabel>
                <FormControl>
                  <Input placeholder="Enter number from 1 to 50" {...field} />
                </FormControl>
                <FormDescription>
                  Enter max load weight that can be carried by this AGV
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_speed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max speed</FormLabel>
                <FormControl>
                  <Input placeholder="Enter number from 1 to 30" {...field} />
                </FormControl>
                <FormDescription>
                  Enter max speed limit (unit: m/s)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
