<script>
    export let segment;
</script>

<!-- Component HTML -->

<div>

    <!-- Footer Logo Company -->
    <img src='./assets/svg/Footer_Img.svg' alt='company_logo_footer' />

    <!-- Footer Nav. Menu -->
    <div>
        <a rel=prefetch sapper:noscroll aria-current='{segment === 'about' ? 'about' : undefined}' href='/about'> About </a>
        <a rel=prefetch sapper:noscroll aria-current='{segment === 'blog' ? 'blog' : undefined}' href='/blog'> Blog </a>
        <a rel=prefetch sapper:noscroll aria-current='{segment === 'privacy_policy' ? 'privacy_policy' : undefined}' href='/privacy_policy'> Privacy Policy </a>
        <a rel=prefetch sapper:noscroll aria-current='{segment === 'contact_us' ? 'contact_us' : undefined}' href='/contact_us'> Contact Us </a>
        <a rel=prefetch sapper:noscroll aria-current='{segment === 'explorer' ? 'explorer' : undefined}' href='/explorer'> Explorer </a>
    </div>

</div>

<!-- Component SASS (CSS) -->

<style lang='sass'>
    
    @import '../../styles/main.sass'

    div
        @include flex-config($align-items: center, $justify-content: start)
        padding: 35px
        justify-content: space-between
        background: 
            color: #161616
            
    a
        text-decoration: none
        color: #6B6B6B
        margin: 0px 10px
        font:
            family: Azonix
            size: 15px

        &:hover
            color: white
            transition: all 0.5s ease

        [aria-current]
            color: #FFA800

</style>