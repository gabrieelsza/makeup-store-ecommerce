export default function Button(props) {

    const baseClasses = "inline-flex items-center justify-center px-6 py-3 gap-2 font-sans font-medium transition-all duration-200h-14 text-sm tracking-wide rounded-sm "

    const variantClasses = {
        accent: "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-flame text-flame-foreground hover:bg-flame/90 h-14 px-8 text-sm tracking-wide rounded-sm",

        primary:
            "transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none bg-blush-amber text-blush-burgundy hover:bg-blush-amber/80",

        outline:
            "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[props.variant]}`}
            type={props.type}
        >

            {props.label}
        </button>
    )
}